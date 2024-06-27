import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Alert, Form } from 'react-bootstrap';

const CadastroUsuario = () => {
    // estado para armazenar usuarios
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        endereco: '',
        data_nascimento: '',
        senha: '',
        foto_perfil: null
    });

    // Estado para armazenar mensagens de sucesso ou erro
    const [mensagem, setMensagem] = useState();

    const [detalhesErro, setDetalhesErro] = useState();

    // Função para atualizar o estado quando o input do formulario
    const atualizarForm = (estado) => {
        const { name, value } = estado.target;
        setFormData(
            (prevFormData) =>
                ({ ...prevFormData, [name]: value })
        )
    }

    // Função para atualizar o estado quando o foto perfil
    const atualizarFile = (estado) => {
        setFormData(
            (prevFormData) =>
            ({
                ...prevFormData, foto_perfil: estado.target.files[0]
            })
        )
    };


    const DadosEnvio = async (event) => {
        event.preventDefault();
        // criando um objeto FormData para enviar os dados do formulario
        const data = new FormData();
        // Adiciona cada campo do formulario ao FormData
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            await axios.post('http://localhost:3001/api/usuario',
                data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            // Mostra a mensagem de sucesso
            setMensagem('Usuario cadastrado com sucesso');
            setDetalhesErro('');
        } catch (error) {
            // Definindo a mensagem de erro ao cadastrar
            setMensagem('Erro ao cadastrar usuario');
            if (error.response && error.response.data && error.response.data.detalhes) {
                setDetalhesErro(error.response.data.detalhes);
            } else if (error.request) {
                setDetalhesErro('Erro de rede:' + error.message);
                console.log('Erro de rede:', error)
            } else {
                setDetalhesErro(error.message);
                console.log('Erro:', error)
            }
        }
    };
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col md='6'>
                    <h2>Cadastro de usuarios</h2>
                    {mensagem && (
                        <Alert variant={mensagem.includes('sucess') ? 'success' : 'danger'}>
                            {mensagem}
                            {detalhesErro && (
                                <div>
                                    <strong>Detalhes:</strong> {detalhesErro}
                                </div>
                            )}

                        </Alert>
                    )}
                    <Form onSubmit={DadosEnvio}>
                        <Form.Group>
                            <Form.Label htmlFor="nome">Nome:</Form.Label>
                            <Form.Control type="text" id="nome" name="nome" value={formData.nome} onChange={atualizarForm} required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="email">E-mail:</Form.Label>
                            <Form.Control type="email" id="email" name="email" value={formData.email} onChange={atualizarForm} required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="telefone">Telefone:</Form.Label>
                            <Form.Control type="telefone" id="telefone" name="telefone" value={formData.telefone} onChange={atualizarForm} required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="cpf">CPF:</Form.Label>
                            <Form.Control type="text" id="cpf" name="cpf" value={formData.cpf} onChange={atualizarForm} required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="endereco">Endereço completo:</Form.Label>
                            <Form.Control type="text" id="endereco" name="endereco" value={formData.endereco} onChange={atualizarForm} required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="data_nascimento">Data de nascimento:</Form.Label>
                            <Form.Control type="date" id="data_nascimento" name="data_nascimento" value={formData.data_nascimento} onChange={atualizarForm} required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="senha">Senha:</Form.Label>
                            <Form.Control type="password" id="senha" name="senha" value={formData.senha} onChange={atualizarForm} required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="foto_perfil">Foto perfil:</Form.Label>
                            <Form.Control type="file" id="foto_perfil" name="foto_perfil" onChange={atualizarFile}></Form.Control>
                        </Form.Group>
                        <Button className="mt-3 mb-3" variant="primary" type="submit">Cadastrar</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CadastroUsuario;

