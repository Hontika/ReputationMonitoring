import { createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.body} !important;
    color: ${({ theme }) => theme.colors.text} !important;
    font-family: ${({ theme }) => theme.font} !important;
    transition: all 0.50s linear !important;
  }

  .navbar {
    background: ${({theme}) => theme.colors.navbar};
  }

  .emailconfirm {
    background: ${({theme}) => theme.colors.emailconfirm.background} !important;
    color: ${({theme}) => theme.colors.emailconfirm.text} !important;
    border-radius: ${({theme}) => theme.colors.emailconfirm.borderradius} !important;
  }

  .emailconfirmbtn{
    box-shadow: var(--tw-ring-inset) 0 0 0 calc(${({ theme }) => theme.colors.emailconfirm.buttonhover.ringwidth} + var(--tw-ring-offset-width)) var(--tw-ring-color) !important;
    --tw-ring-color: ${({ theme }) => theme.colors.emailconfirm.buttonhover.ringcolor} !important;
    background: ${({ theme }) => theme.colors.emailconfirm.background} !important;
    text: ${({ theme }) => theme.colors.emailconfirm.text} !important;
  }

  .emailconfirmbtn:hover{
    background: ${({ theme }) => theme.colors.emailconfirm.buttonhover.background} !important;
    color: ${({ theme }) => theme.colors.emailconfirm.buttonhover.text} !important;
  }

  .activelink{
    background: ${({ theme }) => theme.colors.navbarlinkactive.background} !important;
    color: ${({ theme }) => theme.colors.navbarlinkactive.text} !important;
    border-radius: ${({ theme }) => theme.colors.navbarlinkactive.borderradius} !important;
  }

  .notactivelink{
    background: ${({ theme }) => theme.colors.navbarlinknotactive.background} !important;
    color: ${({ theme }) => theme.colors.navbarlinknotactive.text} !important;
    border-radius: ${({ theme }) => theme.colors.navbarlinknotactive.borderradius} !important;
  }

  .notactivelink:hover{
    background: ${({ theme }) => theme.colors.navbarlinknotactive.hover.background} !important;
    color: ${({ theme }) => theme.colors.navbarlinknotactive.hover.text} !important;
  }

  .mobilemenubutton {
    border-radius: ${({ theme }) => theme.colors.mobilemenubutton.borderradius} !important;
    color: ${({ theme }) => theme.colors.mobilemenubutton.text} !important;
  }

  .mobilemenubutton:hover {
    background: ${({ theme }) => theme.colors.mobilemenubutton.hover.background} !important;
    color: ${({ theme }) => theme.colors.mobilemenubutton.hover.text} !important;
  }

  .mobilemenubutton:focus {
    outline: 2px solid transparent !important;
    outline-offset: 2px !important;
    box-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  }

  .profiledropdown{
    background: ${({ theme }) => theme.colors.profiledropdown.background} !important;
    color: ${({ theme }) => theme.colors.profiledropdown.text} !important;
  }

  .profiledropdownactive{
    background: ${({ theme }) => theme.colors.profiledropdown.hover.background} !important;
    color: ${({theme}) => theme.colors.profiledropdown.text} !important;
  }

  .bell {
    background: ${({ theme }) => theme.colors.bell.background} !important;
    border-radius: ${({ theme }) => theme.colors.bell.borderradius} !important;
    color: ${({ theme }) => theme.colors.bell.text} !important;
  }

  .bell:hover {
    background: ${({ theme }) => theme.colors.bell.background} !important;
    color: ${({ theme }) => theme.colors.bell.hover.text} !important;
  }

  a {
    color: ${({ theme }) => theme.colors.link.text};
    cursor: pointer !important;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.link.hover.text};
    cursor: pointer !important;
  }

  button {
    border-radius: ${({ theme }) => theme.colors.button.borderradius} !important;
    cursor: pointer !important;
    background-color: ${({ theme }) => theme.colors.button.background} !important;
    color: ${({ theme }) => theme.colors.button.text} !important;
    font-family: ${({ theme }) => theme.font} !important;
  }

  input{
    box-shadow: var(--tw-ring-inset) 0 0 0 calc(${({ theme }) => theme.colors.input.ringwidth} + var(--tw-ring-offset-width)) var(--tw-ring-color) !important;
    --tw-ring-color: ${({ theme }) => theme.colors.input.ringcolor} !important;
    color: ${({ theme }) => theme.colors.input.text} !important;
    border-radius: ${({ theme }) => theme.colors.input.borderradius} !important;
  }

  input:placeholder {
    color: ${({ theme }) => theme.colors.input.placeholder} !important;
  }

  input:focus {
    var(--tw-ring-inset) 0 0 0 calc(${({ theme }) => theme.colors.input.focus.ringwidth} + var(--tw-ring-offset-width)) var(--tw-ring-color) !important;
    --tw-ring-color: ${({ theme }) => theme.colors.input.focus.ringcolor} !important;
    border-color:${({ theme }) => theme.colors.input.focus.ringcolor} !important;
  }

  input:focus-visible {
    outline-color: ${({ theme }) => theme.colors.input.focus.ringcolor} !important;
  }

  h2,h1,label,p {
    color: ${({ theme }) => theme.colors.paragraphs} !important;
  }

  button:hover{
    background-color: ${({ theme }) => theme.colors.button.hover.background} !important;
  }
`;