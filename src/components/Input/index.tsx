import React, {
  InputHTMLAttributes,
  useState,
  useCallback,
  useRef,
} from 'react';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styled';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  isErrored: boolean;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  icon: Icon,
  isErrored,
  errorMessage,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container isErrored={isErrored} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
      />

      {errorMessage && (
        <Error title={errorMessage}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
