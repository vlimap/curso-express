import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginUsuario from '../../services/LoginUsuario';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    const Logando = async (evento) => {
        evento.preventDefault();

        try {
            await LoginUsuario.Login(email, senha);
            setError('');
            history.push('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1> Login de usuário</h1>
            {mensagem && (
                <Alert variant={mensagem.includes('sucess') ? 'success' : 'danger'}>
                    {erro}
                </Alert>
            )}
            <Form onSubmit={Login}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        E-mail
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" required />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Senha
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Digite aqui sua senha" />
                    </Col>
                </Form.Group>
                <Button className="mt-3 mb-3" variant="primary" type="submit">Login</Button>
            </Form>
        </div>
    )
};

export default Login;

