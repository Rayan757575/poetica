import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

import { UNCATEGORIZED_NOTEBOOK_ID } from '@/features/notebooks/store/useNotebooksStore';
import { PoemEditorHeader } from '@/features/poems/components/PoemEditorHeader';
import {
  DEFAULT_POEM_TITLE,
  NEW_POEM_ID,
  usePoemsStore,
} from '@/features/poems/store/usePoemsStore';
import { colors } from '@/shared/theme/colors';

// Rota única do editor, em dois modos:
// - `/poem/<id>`: edita um poema existente.
// - `/poem/new?notebookId=...`: rascunho. Nada vai pro store enquanto o
//   usuário digita; ao sair, só vira poema se título OU conteúdo tiver algo.
//   Assim rascunhos vazios nunca chegam ao storage, sem depender de comparar
//   o título com o nome padrão (que continua válido como escolha do usuário).
export default function PoemScreen() {
  const { id, notebookId } = useLocalSearchParams<{ id: string; notebookId?: string }>();
  const isDraft = id === NEW_POEM_ID;
  const poem = usePoemsStore((state) =>
    isDraft ? undefined : state.poems.find((p) => p.id === id)
  );
  const addPoem = usePoemsStore((state) => state.addPoem);
  const updatePoem = usePoemsStore((state) => state.updatePoem);

  const [title, setTitle] = useState(poem?.title ?? '');
  const [content, setContent] = useState(poem?.content ?? '');

  // Espelho do texto atual pra o cleanup do useEffect abaixo não enxergar
  // um title/content "velho" (closure stale). Atualizado nos handlers (e
  // não no render) pra seguir as regras do React Compiler.
  const titleRef = useRef(title);
  const contentRef = useRef(content);

  const changeTitle = (text: string) => {
    titleRef.current = text;
    setTitle(text);
  };
  const changeContent = (text: string) => {
    contentRef.current = text;
    setContent(text);
  };

  // Salva UMA vez, ao desmontar a tela — cobre a seta de voltar, o botão
  // físico do Android e o gesto de arrastar. Escalável: zero escrita no
  // storage por tecla digitada; só a versão final da sessão de edição.
  useEffect(() => {
    return () => {
      const data = { title: titleRef.current, content: contentRef.current };
      if (isDraft) {
        const isEmpty = !data.title.trim() && !data.content.trim();
        if (!isEmpty) addPoem(notebookId ?? UNCATEGORIZED_NOTEBOOK_ID, data);
        return;
      }
      if (id) updatePoem(id, data);
    };
  }, [id, isDraft, notebookId, addPoem, updatePoem]);

  // TODO: ao selecionar uma palavra, abrir menu com busca de sinônimos
  // (feature central do produto). Candidato: @10play/tentap-editor.
  return (
    <View className="flex-1 bg-backgroundReading">
      <PoemEditorHeader onBack={() => router.back()} />
      <View className="flex-1 px-6 pt-4">
        <TextInput
          placeholder={DEFAULT_POEM_TITLE}
          placeholderTextColor={colors.muted}
          selectionColor={colors.primary}
          multiline
          value={title}
          onChangeText={changeTitle}
          className="font-medium text-2xl text-ink"
        />
        <TextInput
          placeholder="Escreva aqui"
          placeholderTextColor={colors.muted}
          selectionColor={colors.primary}
          multiline
          value={content}
          onChangeText={changeContent}
          className="mt-4 flex-1 font-reading text-base text-ink"
          textAlignVertical="top"
        />
      </View>
    </View>
  );
}
