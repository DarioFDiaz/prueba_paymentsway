import { TextInput } from 'react-native'

type Props = {
  value: string
  onChangeText: (text: string) => void
}

export default function SearchInput({ value, onChangeText }: Props) {
  return (
    <TextInput
      className="w-full border border-gray-300 rounded-xl p-3 bg-white text-gray-700"
      placeholder="Ingresa una ciudad (ej: Madrid)"
      value={value}
      onChangeText={onChangeText}
    />
  )
}