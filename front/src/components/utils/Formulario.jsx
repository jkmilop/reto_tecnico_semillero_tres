import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react';

const Formulario = ({ fields, formData, onSubmit, onCancel, onSubmitSuccess }) => {
  const [formState, setFormState] = useState(formData || {});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormState(formData || {});
    setErrors({});
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Call the onSubmit function and pass the formData
      onSubmit(formState);
      setFormState({});
      setErrors({});
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    let validationErrors = {};
    fields.forEach((field) => {
      if (field.required && !formState[field.name]?.trim()) {
        validationErrors[field.name] = `${field.label} es requerido`;
      }
    });
    return validationErrors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="start">
        {fields.map((field) => (
          <FormControl key={field.name} isInvalid={!!errors[field.name]}>
            <FormLabel>{field.label}</FormLabel>
            {field.type === 'textarea' ? (
              <Textarea
                name={field.name}
                value={formState[field.name] || field.defaultValue || ''}
                onChange={handleInputChange}
              />
            ) : (
              <Input
                type={field.type || 'text'}
                name={field.name}
                value={formState[field.name] || field.defaultValue || ''}
                onChange={handleInputChange}
              />
            )}
            <FormErrorMessage>{errors[field.name]}</FormErrorMessage>
          </FormControl>
        ))}

        <Button type="submit" colorScheme="blue" mr={3}>
          Guardar
        </Button>
        {onCancel && (
          <Button colorScheme="gray" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </VStack>
    </form>
  );
};

export default Formulario;
