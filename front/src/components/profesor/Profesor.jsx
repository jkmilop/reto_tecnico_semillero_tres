import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useFilters, useGlobalFilter } from 'react-table';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
} from '@chakra-ui/react';
import Formulario from '../utils/Formulario'; // Update the path

export default function Profesor() {
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProfesor, setSelectedProfesor] = useState(null);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Nombre', accessor: 'nombre' },
      { Header: 'Identificación', accessor: 'identificacion' },
      { Header: 'Teléfono', accessor: 'telefono' },
      { Header: 'Título Académico', accessor: 'titulo_academico' },
      { Header: 'Fecha de Inicio', accessor: 'fecha_inicio' },
      {
        Header: 'Acciones',
        accessor: 'actions',
        Cell: ({ row }) => (
          <Button size="sm" colorScheme="teal" onClick={() => handleUpdateProfesor(row.original)}>
            Actualizar
          </Button>
        ),
      },
    ],
    []
  );

  const fetchProfesores = async () => {
    try {
      const response = await fetch('http://localhost:3000/profesores'); // Update URL based on your API
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchProfesores();
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value || '';
    setFilterInput(value);
  };

  const filteredData = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.filter((row) => {
      return (
        row.id &&
        row.nombre &&
        row.identificacion &&
        row.telefono &&
        row.titulo_academico &&
        row.fecha_inicio &&
        (row.id.toString().includes(filterInput.toLowerCase()) ||
          row.nombre.toLowerCase().includes(filterInput.toLowerCase()) ||
          row.identificacion.toString().includes(filterInput.toLowerCase()) ||
          row.telefono.toString().includes(filterInput.toLowerCase()) ||
          row.titulo_academico.toLowerCase().includes(filterInput.toLowerCase()) ||
          row.fecha_inicio.includes(filterInput.toLowerCase()))
      );
    });
  }, [data, filterInput]);

  const handleAddProfesor = () => {
    setShowModal(true);
    setSelectedProfesor(null);
  };

  const handleUpdateProfesor = async (profesor) => {
    setSelectedProfesor(profesor);
    setShowModal(true);
  };

  const handleSaveProfesor = async (newProfesor) => {
    try {
      let url = 'http://localhost:3000/profesor'; // Update URL based on your API
      let method = 'POST';

      if (selectedProfesor) {
        url = 'http://localhost:3000/updateprofesor'; // Update URL based on your API
        method = 'POST';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProfesor),
      });

      if (response.ok) {
        const updatedProfesor = await response.json();
        setData((prevData) => {
          if (selectedProfesor) {
            const updatedData = prevData.map((profesor) => {
              if (profesor.id === selectedProfesor.id) {
                return { ...profesor, ...updatedProfesor };
              }
              return profesor;
            });
            return updatedData;
          }
          const newData = [...prevData, updatedProfesor];
          return newData;
        });
        setShowModal(false);
      } else {
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: filteredData }, useFilters, useGlobalFilter);

  return (
    <Stack spacing={4}>
      <Button onClick={handleAddProfesor} mb={4}>
        Agregar Profesor
      </Button>
      <Input
        value={filterInput || ''}
        onChange={handleFilterChange}
        placeholder="Buscar profesor"
        mb={4}
      />
      <Table {...getTableProps()} width="100%">
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formulario
              fields={[
                { name: 'nombre', label: 'Nombre', required: true },
                { name: 'identificacion', label: 'Identificación', required: true },
                { name: 'telefono', label: 'Teléfono', required: true },
                { name: 'titulo_academico', label: 'Título Académico', required: true },
                { name: 'fecha_inicio', label: 'Fecha de Inicio', type: 'date' },
              ]}
              formData={selectedProfesor}
              onSubmit={handleSaveProfesor}
              onCancel={() => setShowModal(false)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
