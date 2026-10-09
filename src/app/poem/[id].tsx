import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { usePoemsStore } from '@/features/poems/store/usePoemsStore';

// No v1, o botão de voltar chamava createNewPoem() — uma função que
// estava inteira comentada, ou seja, o texto nunca era salvo. Aqui o
// título e o conteúdo são salvos de verdade ao sair da tela.
//
// TODO (fase 3): trocar os TextInput por <RichText> do
// @10play/tentap-editor, com a extensão custom de sinônimos no menu
// de seleção.
export default function PoemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const poem = usePoemsStore((state) => state.poems.find((p) => p.id === id));
  const updatePoem = usePoemsStore((state) => state.updatePoem);

  const [title, setTitle] = useState(poem?.title ?? '');
  const [content, setContent] = useState(poem?.content ?? '');

  useEffect(() => {
    setTitle(poem?.title ?? '');
    setContent(poem?.content ?? '');
  }, [poem?.id]);

  const saveAndGoBack = () => {
    if (id) {
      updatePoem(id, { title, content });
    }
    router.back();
  };

  return (
    <View className="flex-1 bg-white px-6 pt-16">
      <Pressable onPress={saveAndGoBack} className="mb-6">
        <Ionicons name="arrow-back" size={24} color="#161616" />
      </Pressable>
      <TextInput
        placeholder="Title"
        multiline
        value={title}
        onChangeText={setTitle}
        className="font-medium text-2xl text-dark"
      />
      <TextInput
        placeholder="Write here"
        multiline
        value={content}
        onChangeText={setContent}
        className="mt-4 flex-1 font-regular text-base text-dark"
        textAlignVertical="top"
      />
    </View>
  );
}
