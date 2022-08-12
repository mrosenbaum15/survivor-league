import {Button, Form} from 'react-bootstrap';
import '../styles/login.css'

function RegisterForm({
    newName,
    newUsername,
    newEmail,
    newPassword,
    setNewName,
    setNewUsername,
    setNewEmail,
    setNewPassword,
    changeAuthMode,
    handleRegister
}) {
    
    return (
        <>
            <div className='login-section'>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicNameSignup">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control value={newName} onChange={(e) => setNewName(e.target.value)} type="name" placeholder="Enter name" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmaillSignup">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={newEmail} onChange={(e) => setNewEmail(e.target.value)} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUsernamelSignup">
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={newUsername} onChange={(e) => setNewUsername(e.target.value)} type="username" placeholder="Enter username" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPasswordSignup">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder="Password" />
                    </Form.Group>
                    <div>
                    Already have an account?  
                    <Button className='anchor-button' onClick={changeAuthMode}>Sign in</Button>
                    </div>
                    
                </Form>
                <Button onClick={handleRegister} variant="primary">Create Account</Button>
            </div>
        </>       
    );

}

export default RegisterForm;