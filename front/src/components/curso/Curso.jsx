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

export default function Curso() {
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState(null);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Nombre', accessor: 'nombre' },
      { Header: 'Nombre del Profesor', accessor: 'nombre_profesor' },
      { Header: 'Prerrequisito', accessor: 'prerrequisito' },
      { Header: 'Activo', accessor: 'activo' },
      { Header: 'Créditos', accessor: 'creditos' },
      { Header: 'Cupos', accessor: 'cupos' },
      { Header: 'Cupos Disponibles', accessor: 'cupos_disponibles' },
      {
        Header: 'Acciones',
        accessor: 'actions',
        Cell: ({ row }) => (
          <Button size="sm" colorScheme="teal" onClick={() => handleUpdateCurso(row.original)}>
            Actualizar
          </Button>
        ),
      },
    ],
    []
  );

  const fetchCursos = async () => {
    try {
      const response = await fetch('http://localhost:3000/cursos'); // Update URL based on your API
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchCursos();
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
        row.nombre_profesor &&
        row.prerrequisito &&
        row.activo !== undefined &&
        row.creditos !== undefined &&
        row.cupos !== undefined &&
        row.cupos_disponibles !== undefined &&
        (row.id.toString().includes(filterInput.toLowerCase()) ||
          row.nombre.toLowerCase().includes(filterInput.toLowerCase()) ||
          row.nombre_profesor.toLowerCase().includes(filterInput.toLowerCase()) ||
          row.prerrequisito.toLowerCase().includes(filterInput.toLowerCase()) ||
          row.activo.toString().includes(filterInput.toLowerCase()) ||
          row.creditos.toString().includes(filterInput.toLowerCase()) ||
          row.cupos.toString().includes(filterInput.toLowerCase()) ||
          row.cupos_disponibles.toString().includes(filterInput.toLowerCase()))
      );
    });
  }, [data, filterInput]);

  const handleAddCurso = () => {
    setShowModal(true);
    setSelectedCurso(null);
  };

  const handleUpdateCurso = async (curso) => {
    setSelectedCurso(curso);
    setShowModal(true);
  };

  const handleSaveCurso = async (newCurso) => {
    try {
      let url = 'http://localhost:3000/curso'; // Update URL based on your API
      let method = 'POST';

      if (selectedCurso) {
        url = 'http://localhost:3000/updatecurso'; // Update URL based on your API
        method = 'POST';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCurso),
      });

      if (response.ok) {
        const updatedCurso = await response.json();
        setData((prevData) => {
          if (selectedCurso) {
            const updatedData = prevData.map((curso) => {
              if (curso.id === selectedCurso.id) {
                return { ...curso, ...updatedCurso };
              }
              return curso;
            });
            return updatedData;
          }
          const newData = [...prevData, updatedCurso];
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
      <Button onClick={handleAddCurso} mb={4}>
        Agregar Curso
      </Button>
      <Input
        value={filterInput || ''}
        onChange={handleFilterChange}
        placeholder="Buscar curso"
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
                { name: 'nombre_profesor', label: 'Nombre del Profesor', required: true },
                { name: 'prerrequisito', label: 'Prerrequisito', required: true },
                { name: 'activo', label: 'Activo', required: true, type: 'boolean' },
                { name: 'creditos', label: 'Créditos', required: true, type: 'number' },
                { name: 'cupos', label: 'Cupos', required: true, type: 'number' },
                { name: 'cupos_disponibles', label: 'Cupos Disponibles', required: true, type: 'number' },
              ]}
              formData={selectedCurso}
              onSubmit={handleSaveCurso}
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
