import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { useSelector } from 'react-redux'
import {
  Box,
  H5,
  H2,
  Label,
  Illustration,
  Input,
  FormGroup,
  Button,
  Text,
  MessageBox,
  SoftwareBrothers,
  themeGet,
} from '@admin-bro/design-system'
import { useTranslation } from '../../hooks'
import { ReduxState } from '../../store/store'

const GlobalStyle = createGlobalStyle`
  html, body, #app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: white;
  }
`

const Wrapper = styled(Box)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  background: white;
`

const StyledLogo = styled.img`
  max-width: 200px;
  margin: ${themeGet('space', 'md')} 0;
`

export type LoginProps = {
  message?: string;
  action: string;
}

export const Login: React.FC<LoginProps> = (props) => {
  const { action, message } = props
  const { translateLabel, translateButton, translateProperty, translateMessage } = useTranslation()
  const branding = useSelector((state: ReduxState) => state.branding)

  return (
    <React.Fragment>
      <GlobalStyle />
      <Wrapper flex>
        <Box bg="white" height="440px" flex width={[1, 2 / 3, 'auto']}>
          <Box
            as="form"
            action={action}
            method="POST"
            p="x3"
            flexGrow={1}
            width={['100%', '100%', '480px']}
          >
            <H5 marginBottom="xxl" style={{textAlign: 'center'}}>
              {branding.logo ? (
                <StyledLogo
                  src={branding.logo}
                  alt={branding.companyName}
                />
              ) : branding.companyName}
            </H5>
            {message && (
              <MessageBox
                my="lg"
                message={message.split(' ').length > 1 ? message : translateMessage(message)}
                variant="danger"
              />
            )}
            <FormGroup>
              <Label required>{translateProperty('email')}</Label>
              <Input name="email" placeholder={translateProperty('email')} />
            </FormGroup>
            <FormGroup>
              <Label required>{translateProperty('password')}</Label>
              <Input
                type="password"
                name="password"
                placeholder={translateProperty('password')}
                autoComplete="new-password"
              />
            </FormGroup>
            <Text mt="xl" textAlign="center">
              <Button variant="primary">
                {translateButton('login')}
              </Button>
            </Text>
          </Box>
        </Box>
        {branding.softwareBrothers ? (<Box mt="xxl"><SoftwareBrothers /></Box>) : null}
      </Wrapper>
    </React.Fragment>
  )
}

export default Login
