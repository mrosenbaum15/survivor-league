import {Button, Form} from 'react-bootstrap';
import '../styles/login.css'

function RegisterForm({
    confirmationCode,
    setConfirmationCode,
    handleVerify
}) {
    
    return (
        <>
            <div className='login-section'>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicNameSignup">
                        <Form.Label>Verify Account</Form.Label>
                        <Form.Control value={confirmationCode} onChange={(e) => setConfirmationCode(e.target.value)} type="code" placeholder="Enter confirmation code" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                </Form>
                <Button onClick={handleVerify} variant="primary">Verify</Button>
            </div>
        </>       
    );

}

export default RegisterForm;