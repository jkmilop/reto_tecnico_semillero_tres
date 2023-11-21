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

export default function Facultad() {
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedFacultad, setSelectedFacultad] = useState(null);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'facultad_id' }, // Update accessor based on your API response
      { Header: 'Nombre', accessor: 'nombre' },
      { Header: 'Fecha de Inauguración', accessor: 'fecha_inauguracion', type: 'date' },
      {
        Header: 'Acciones',
        accessor: 'actions',
        Cell: ({ row }) => (
          <Button size="sm" colorScheme="teal" onClick={() => handleUpdateFacultad(row.original)}>
            Actualizar
          </Button>
        ),
      },
    ],
    []
  );

  const fetchFacultades = async () => {
    try {
      const response = await fetch('http://localhost:3000/facultades'); // Update URL based on your API
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchFacultades();
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
        row.facultad_id &&
        row.nombre &&
        row.fecha_inauguracion &&
        (row.facultad_id.toString().includes(filterInput.toLowerCase()) ||
          row.nombre.toLowerCase().includes(filterInput.toLowerCase()) ||
          row.fecha_inauguracion.toString().includes(filterInput.toLowerCase()))
      );
    });
  }, [data, filterInput]);

  const handleAddFacultad = () => {
    setShowModal(true);
    setSelectedFacultad(null);
  };

  const handleUpdateFacultad = async (facultad) => {
    setSelectedFacultad(facultad);
    setShowModal(true);
  };

  const handleSaveFacultad = async (newFacultad) => {
    try {
      let url = 'http://localhost:3000/facultades'; // Update URL based on your API
      let method = 'POST';

      if (selectedFacultad) {
        url = 'http://localhost:3000/facultades'; // Update URL based on your API
        method = 'POST';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFacultad),
      });

      if (response.ok) {
        const updatedFacultad = await response.json();
        setData((prevData) => {
          if (selectedFacultad) {
            const updatedData = prevData.map((facultad) => {
              if (facultad.facultad_id === selectedFacultad.facultad_id) {
                return { ...facultad, ...updatedFacultad };
              }
              return facultad;
            });
            return updatedData;
          }
          const newData = [...prevData, updatedFacultad];
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
      <Button onClick={handleAddFacultad} mb={4}>
        Agregar Facultad
      </Button>
      <Input
        value={filterInput || ''}
        onChange={handleFilterChange}
        placeholder="Buscar facultad"
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
                { name: 'fecha_inauguracion', label: 'Fecha de Inauguración', type: 'date' },
              ]}
              formData={selectedFacultad}
              onSubmit={handleSaveFacultad}
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
