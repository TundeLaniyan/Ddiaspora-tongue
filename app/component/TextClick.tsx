import { ReactElement } from 'react';
import { TouchableOpacity, Text } from 'react-native';

type Props = {
  children: string;
  onPress: (arg: any) => any;
  style: any;
};

function TextClick({ children, onPress, style, ...props }: Props): ReactElement<Props> {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style} {...props}>{children}</Text>
    </TouchableOpacity>
  );
}


export default TextClick;