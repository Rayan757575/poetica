import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { usePoemsStore } from '@/features/poems/store/usePoemsStore';

export default function PoemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const poem = usePoemsStore((state) => state.poems.find((p) => p.id === id));
  const updatePoem = usePoemsStore((state) => state.updatePoem);

  const [title, setTitle] = useState(poem?.title ?? '');
  const [content, setContent] = useState(poem?.content ?? '');

  // Sempre com o valor mais recente, pra o cleanup do useEffect abaixo
  // não enxergar um title/content "velho" (closure stale).
  const titleRef = useRef(title);
  const contentRef = useRef(content);
  titleRef.current = title;
  contentRef.current = content;

  useEffect(() => {
    setTitle(poem?.title ?? '');
    setContent(poem?.content ?? '');
  }, [poem?.id]);

  // Salva ao desmontar a tela — cobre a seta de voltar, o botão físico
  // de voltar do Android e o gesto de arrastar, já que todos eles
  // desmontam esse componente (antes só a seta disparava o save).
  useEffect(() => {
    return () => {
      if (id) {
        updatePoem(id, { title: titleRef.current, content: contentRef.current });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <View className="flex-1 bg-white px-6 pt-16">
      <Pressable onPress={() => router.back()} className="mb-6">
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
        className="mt-4 flex-1 font-reading text-base text-dark"
        textAlignVertical="top"
      />
    </View>
  );
}
