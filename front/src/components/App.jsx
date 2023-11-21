import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ChakraProvider, CSSReset, Box, Flex, Text, Link as ChakraLink, Stack } from '@chakra-ui/react';
import Login from './login/Login';
import SignUp from './login/SignUp';
import Profesor from './profesor/Profesor';
import Alumno from './alumno/Alumno';
import Facultad from './facultad/Facultad';
import Curso from './curso/Curso';

function Navbar() {
  return (
    <Flex align="center" justify="space-between" p={4} bg="gray.100">
      <Stack direction="row" spacing={4}>
        <Link to="/inciar-sesion" as={ChakraLink}>
          Iniciar Sesión
        </Link>
        <Link to="/registro" as={ChakraLink}>
          Registrarse
        </Link>
        <Link to="/profesores" as={ChakraLink}>
          Profesores
        </Link>
        <Link to="/alumnos" as={ChakraLink}>
          Alumnos
        </Link>
        <Link to="/facultades" as={ChakraLink}>
          Facultades
        </Link>
        <Link to="/Cursos" as={ChakraLink}>
          Cursos
        </Link>

      </Stack>
    </Flex>
  );
}

function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <Router>
        <>
          <Navbar />
          <Box p={8}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/inciar-sesion" element={<Login />} />
              <Route path="/registro" element={<SignUp />} />
              <Route path="/profesores" element={<Profesor />} />
              <Route path="/alumnos" element={<Alumno />} />
              <Route path="/facultades" element={<Facultad />} />
              <Route path="/Cursos" element={<Curso />} />


            </Routes>
          </Box>
        </>
      </Router>
    </ChakraProvider>
  );
}

export default App;
