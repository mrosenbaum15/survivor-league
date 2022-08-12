import {Button, Form} from 'react-bootstrap';
import '../styles/login.css'


function LoginForm({
    username,
    password,
    setUsername,
    setPassword,
    changeAuthMode,
    handleLogin
}) {

    
    return (
        <>
            <div className='login-section'>
                <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Enter username" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                </Form.Group>
                <div>
                    Don't have an account?  
                    <Button className='anchor-button' onClick={changeAuthMode}>Sign up</Button>
                </div>
                    
                </Form>
                <Button onClick={handleLogin} variant="primary">Login</Button>
            </div>
        </>       
    );

}

export default LoginForm;