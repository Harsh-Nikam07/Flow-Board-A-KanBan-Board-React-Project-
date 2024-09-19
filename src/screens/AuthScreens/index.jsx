import { useState } from 'react';
import { Container, Stack, Button, Typography, TextField   } from '@mui/material'
import LogoImg from '../../assets/logo.svg'
import ImageEl from '../../components/utils/imageEl'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
const initForm = {
    email: "",
    password:"",
}
const AuthScreen = () => {


    const [isLogin, setIsLogin] =  useState(true);
    const [isLoading, setLoading] = useState(false);
    const [form, setFrom] = useState(initForm);
    const authText = isLogin ? "Do not have an Account ?" : "Already have a Account ?";

    const handleChange = (event) => 
        setFrom((oldform) => ({
            ...oldform,
            [event.target.name]:event.target.value,
        }))

        const [showPassword, setShowPassword] = useState(false);
    
        const handleClickShowPassword = () => setShowPassword((show) => !show);
      
        const handleMouseDownPassword = (event) => {
          event.preventDefault();
        };
      
        const handleMouseUpPassword = (event) => {
          event.preventDefault();
        };


    const handleAuth = async () => {

      try {
        setLoading(true)
        if(isLogin){
          await signInWithEmailAndPassword(auth, form.email, form.password);

        }
        else{
          await createUserWithEmailAndPassword(auth, form.email, form.password);
        }
        
      } catch (error) {
        const msg = error.code.split('auth/')[1].split('-').join(' ')
        console.log(msg);
        setLoading(false);
      }
    };


   

    /*
        handleChange function: Updates the form state when an input field's value changes.

        1. The function receives an `event` object as a parameter, triggered by an input change.

        2. Uses `setForm` (the state updater function from the `useState` hook) to update the form state. 
        - It takes a callback function as its argument, which provides the current state (`oldForm`). 
        - Using a callback ensures that the state is correctly updated even if changes occur asynchronously.

        3. Inside the callback function:
        - The spread operator (`...oldForm`) creates a new copy of the current form state. This is crucial because React requires state updates to be immutable (no direct modification of the existing state).

        - The line `[event.target.name]: event.target.value` dynamically updates the form field:
            - `event.target.name` is the `name` attribute of the input element that triggered the change. This allows the function to know which field in the state to update (e.g., "username").
            - `event.target.value` is the new value entered by the user, which is assigned to the corresponding field in the form state.

        4. This approach allows you to use a single `handleChange` function for multiple input fields by leveraging their `name` attributes to identify which part of the state to update.

        5. The function keeps all other form fields unchanged, updating only the field that triggered the change. This ensures that the form state remains consistent as the user interacts with different input fields.

    */


  return (
    // When using the 'sx' prop with values like mt: 10, Material-UI automatically multiplies the value by 8px.
    // For example, mt: 10 will result in a margin-top of 80px (10 * 8px).
    // To use a custom value without the multiplier, provide a string with units, e.g., mt: '20px'.

    <Container maxWidth="xs" sx={{
        mt:10,
    }}> 

        <Stack mb={6} spacing={4} alignItems="center" textAlign="center" >
            <ImageEl  src={LogoImg} alt="FLOWBOARD" />
            <Typography color='rgba(255, 255, 255, 0.6)'>
                Optimize your workflow for enhanced productivity.
                <br/>
                Access your tasks anytime, anywhere.
            </Typography>

        </Stack>
            <Stack spacing={2}>
                <TextField value={form.email} name='email' onChange={handleChange} label='Email' />
                {/* <TextField value={form.password} name='password' onChange={handleChange} label='Password'/> */}

                
                <FormControl  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            value={form.password} name='password' onChange={handleChange}
          />
        </FormControl>


                <Button disabled={isLoading || !form.email.trim() || !form.password.trim()} size='large'  variant='contained' onClick={handleAuth} >
                    {isLogin ? "Login" : "Register"}
                </Button>

                {
            /*
            The `!` (logical NOT) operator is used to reverse the truthiness of a value:
            - `!value` converts a truthy value (one that evaluates to `true`) to `false`.
            - `!value` converts a falsy value (one that evaluates to `false`) to `true`.

            In the condition `!form.email.trim()`:
            - `form.email.trim()` removes any leading and trailing whitespace from the email input.
            - If the trimmed email is an empty string (`""`), it is considered a falsy value.
            - Applying `!` to this empty string results in `true` (i.e., `!""` is `true`).
            - Therefore, `!form.email.trim()` is `true` if the email field is empty or contains only whitespace.

            This means the button will be disabled if the email field is empty. 
            If the email field has content, `!form.email.trim()` evaluates to `false`, and the button can be enabled if other conditions are met.
            */
                }
                
            </Stack>
            <Typography onClick = {() => setIsLogin( o => !o)} textAlign="center" sx={{
                cursor: 'pointer',
            }} mt={4}>
                {authText}
            </Typography>
    </Container>
  )
}
// 1:24:21

export default AuthScreen