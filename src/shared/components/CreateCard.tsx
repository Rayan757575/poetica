import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text, View } from 'react-native';

import { scale } from '@/shared/theme/metrics';

type CreateCardProps = {
  label: string;
  onPress: () => void;
  size?: number;
  radius?: number;
  /** 'below' = texto fora da caixa (padrão do NotebookCard). 'inside' = texto dentro da caixa (padrão do PoemCard). */
  textPosition?: 'below' | 'inside';
};

// Não é o NotebookCard nem o PoemCard — um terceiro tipo, pensado pra
// ser reaproveitado em qualquer grade/lista de criação do app. Mesmo
// esquema visual nos dois usos de hoje (Novo notebook / Novo poema):
// borda tracejada + ícone de + na cor primary, deixando claro que é
// uma ação, não conteúdo.
export function CreateCard({
  label,
  onPress,
  size = 150,
  radius = 30,
  textPosition = 'below',
}: CreateCardProps) {
  const boxSize = scale(size);

  return (
    <Pressable
      onPress={onPress}
      className={
        textPosition === 'below' ? 'mb-6 items-center' : 'mr-6 items-center justify-center'
      }
    >
      <View
        className="items-center justify-center border-2 border-dashed border-primary bg-backgroundTabs"
        style={{ width: boxSize, height: boxSize, borderRadius: radius }}
      >
        <Ionicons name="add" size={Math.round(boxSize * 0.25)} color="#0a63f4" />
        {textPosition === 'inside' && (
          <Text className="mt-2 text-center font-medium text-primary">{label}</Text>
        )}
      </View>
      {textPosition === 'below' && (
        <Text className="mt-1 font-regular text-xs text-primary">{label}</Text>
      )}
    </Pressable>
  );
}