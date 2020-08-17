import React, { useCallback } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { Link, useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import { Container, Content, Background, AnimationContainer } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O E-mail é obrigatório'),
    password: Yup.string()
      .min(6, 'Mínimo seis caractéres')
      .required('A senha é obrigatória'),
  });

  const { control, handleSubmit, errors } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        await api.post('users', data);
        history.push('/');
        addToast({
          type: 'success',
          title: 'Usuário cadastrado com sucesso.',
          description: 'Você já pode fazer seu login no GoBarber!',
        });
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro durante a comunicação com o servidor! Por favor, tente novamente mais tarde',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="goBarber" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Faça seu cadastro</h1>
            <Controller
              as={Input}
              name="name"
              defaultValue=""
              control={control}
              icon={FiUser}
              type="text"
              placeholder="Nome"
              rules={{ required: true }}
              isErrored={!!errors.name}
              errorMessage={errors.name?.message}
            />
            <Controller
              as={Input}
              name="email"
              defaultValue=""
              control={control}
              icon={FiMail}
              type="text"
              placeholder="E-mail"
              rules={{ required: true }}
              isErrored={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Controller
              as={Input}
              name="password"
              defaultValue=""
              control={control}
              type="password"
              icon={FiLock}
              placeholder="Senha"
              rules={{ required: true }}
              isErrored={!!errors.password}
              errorMessage={errors.password?.message}
            />
            <Button type="submit">Cadastrar</Button>
          </form>
          <Link to="/">
            <FiArrowLeft />
            Voltar
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
