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

export default function Alumno() {
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedAlumno, setSelectedAlumno] = useState(null);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Nombre', accessor: 'nombre' },
      { Header: 'Identificación', accessor: 'identificacion' },
      { Header: 'Teléfono', accessor: 'telefono' },
      { Header: 'Semestre', accessor: 'semestre' },
      { Header: 'Nombre Facultad', accessor: 'nombre_facultad' },
      {
        Header: 'Acciones',
        accessor: 'actions',
        Cell: ({ row }) => (
          <Button size="sm" colorScheme="teal" onClick={() => handleUpdateAlumno(row.original)}>
            Actualizar
          </Button>
        ),
      },
    ],
    []
  );

  const fetchAlumnos = async () => {
    try {
      const response = await fetch('http://localhost:3000/alumnos'); // Update URL based on your API
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchAlumnos();
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
        row.semestre &&
        row.nombre_facultad &&
        (row.id.toString().includes(filterInput.toLowerCase()) ||
          row.nombre.toLowerCase().includes(filterInput.toLowerCase()) ||
          row.identificacion.toLowerCase().includes(filterInput.toLowerCase()) ||
          row.telefono.toLowerCase().includes(filterInput.toLowerCase()) ||
          row.semestre.toString().includes(filterInput.toLowerCase()) ||
          row.nombre_facultad.toLowerCase().includes(filterInput.toLowerCase()))
      );
    });
  }, [data, filterInput]);

  const handleAddAlumno = () => {
    setShowModal(true);
    setSelectedAlumno(null);
  };

  const handleUpdateAlumno = async (alumno) => {
    setSelectedAlumno(alumno);
    setShowModal(true);
  };

  const handleSaveAlumno = async (newAlumno) => {
    try {
      let url = 'http://localhost:3000/alumno'; // Update URL based on your API
      let method = 'POST';

      if (selectedAlumno) {
        url = 'http://localhost:3000/updatealumno'; // Update URL based on your API
        method = 'POST';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAlumno),
      });

      if (response.ok) {
        const updatedAlumno = await response.json();
        setData((prevData) => {
          if (selectedAlumno) {
            const updatedData = prevData.map((alumno) => {
              if (alumno.id === selectedAlumno.id) {
                return { ...alumno, ...updatedAlumno };
              }
              return alumno;
            });
            return updatedData;
          }
          const newData = [...prevData, updatedAlumno];
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
      <Button onClick={handleAddAlumno} mb={4}>
        Agregar Alumno
      </Button>
      <Input
        value={filterInput || ''}
        onChange={handleFilterChange}
        placeholder="Buscar alumno"
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
                { name: 'telefono', label: 'Teléfono' },
                { name: 'semestre', label: 'Semestre', type: 'number' },
                { name: 'nombre_facultad', label: 'Nombre Facultad', required: true },
              ]}
              formData={selectedAlumno}
              onSubmit={handleSaveAlumno}
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
