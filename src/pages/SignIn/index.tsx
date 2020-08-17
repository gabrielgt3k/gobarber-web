import React, { useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { Container, Content, Background, AnimationContainer } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

type Inputs = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O E-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
  });

  const { control, handleSubmit, errors } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        await signIn({
          email: data.email,
          password: data.password,
        });
        history.push('/dashboard');
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro durante a comunicação com o servidor! Por favor, cheque as credenciais',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <AnimationContainer>
        <Content>
          <img src={logoImg} alt="goBarber" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Faça seu login</h1>
            <Controller
              control={control}
              as={Input}
              name="email"
              defaultValue=""
              icon={FiMail}
              type="text"
              placeholder="E-mail"
              rules={{ required: true }}
              isErrored={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Controller
              control={control}
              as={Input}
              name="password"
              defaultValue=""
              type="password"
              icon={FiLock}
              placeholder="Senha"
              rules={{ required: true }}
              isErrored={!!errors.password}
              errorMessage={errors.password?.message}
            />
            <Button type="submit">Entrar</Button>

            <Link to="forgot">Esqueci minha senha</Link>
          </form>
          <Link to="register">
            <FiLogIn />
            Cadastre-se
          </Link>
        </Content>
      </AnimationContainer>
      <Background />
    </Container>
  );
};

export default SignIn;
