import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { FormField } from '../types/apiTypes';
import { Input } from './ui/Input';
import { Dropdown } from './ui/Dropdown';
import { DatePicker } from './ui/DatePicker';
import { Chip } from './ui/Chip';
import { Button } from './ui/Button';
import { TextAarea } from './ui/TextArea';

interface DynamicFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
  onCancel: () => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit, onCancel }) => {
  // Generate Yup validation schema from form fields
  const generateValidationSchema = (fields: FormField[]) => {
    const schemaObject: Record<string, any> = {};
    
    fields.forEach(field => {
      let validator: any = yup.mixed();
      
      switch (field.type) {
        case 'text':
        case 'textarea':
          validator = yup.string();
          if (field.validation?.minLength) {
            validator = validator.min(field.validation.minLength, field.validation.message);
          }
          if (field.validation?.maxLength) {
            validator = validator.max(field.validation.maxLength, field.validation.message);
          }
          break;
        case 'date':
          validator = yup.date();
          break;
        case 'select':
        case 'radio':
          validator = yup.string();
          break;
        case 'checkbox':
          validator = yup.array();
          break;
      }
      
      if (field.required) {
        validator = validator.required(`${field.label} is required`);
      }
      
      schemaObject[field.name] = validator;
    });
    
    return yup.object(schemaObject);
  };

  const validationSchema = generateValidationSchema(fields);
  
  const { control, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange'
  });

  const renderField = (field: FormField, isInRow = false) => {
    const error = errors[field.name];
    const errorMessage = error?.message as string;
    const containerClass = isInRow ? 'w-full md:flex-1' : 'w-full';
    
    switch (field.type) {
      case 'text':
        return (
          <div key={field.name} className={containerClass}>
            <Controller
              name={field.name}
              control={control}
              defaultValue={field.defaultValue || ''}
              render={({ field: { onChange, value } }) => (
                <Input
                  label={field.label}
                  type={field.type}
                  value={value}
                  onChange={onChange}
                  placeholder={field.placeholder}
                  error={!!error}
                  errorMessage={errorMessage}
                />
              )}
            />
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} className={field.name === 'firstName' || field.name === 'lastName' ? 'flex-1' : 'w-full'}>
            <Controller
              name={field.name}
              control={control}
              defaultValue={field.defaultValue || ''}
              render={({ field: { onChange, value } }) => (
                <TextAarea
                  label={field.label}
                  value={value}
                  onChange={onChange}
                  placeholder={field.placeholder}
                  error={!!error}
                  errorMessage={errorMessage}
                />
              )}
            />
          </div>
        )

      case 'select':
        return (
          <div key={field.name} className={containerClass}>
            <Controller
              name={field.name}
              control={control}
              defaultValue={field.defaultValue || ''}
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  label={field.label}
                  options={field.options || []}
                  value={value}
                  onChange={onChange}
                  placeholder="Select..."
                  error={!!error}
                  errorMessage={errorMessage}
                />
              )}
            />
          </div>
        );

      case 'radio':
        return (
          <div key={field.name} className={containerClass}>
            <label>
              {field.label}
            </label>
            <Controller
              name={field.name}
              control={control}
              defaultValue={field.defaultValue || ''}
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-wrap gap-2">
                  {field.options?.map(option => (
                    <div key={option.value} onClick={() => onChange(option.value)}>
                      <Chip 
                        label={option.label}
                        variant={value === option.value ? 'selected' : 'default'}
                        size='lg'
                      />
                    </div>
                  ))}
                </div>
              )}
            />
            {error && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.name} className={containerClass}>
            <label>
              {field.label}
            </label>
            <Controller
              name={field.name}
              control={control}
              defaultValue={field.defaultValue || []}
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-wrap gap-2">
                  {field.options?.map(option => (
                    <div 
                      key={option.value} 
                      onClick={() => {
                        const newValue = value?.includes(option.value)
                          ? (value || []).filter((v: string) => v !== option.value)
                          : [...(value || []), option.value];
                        onChange(newValue);
                      }}
                    >
                      <Chip 
                        label={option.label}
                        variant={value?.includes(option.value) ? 'selected' : 'default'}
                        size='lg'
                      />
                    </div>
                  ))}
                </div>
              )}
            />
            {error && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
          </div>
        );

      case 'date':
        return (
          <div key={field.name} className={containerClass}>
            <Controller
              name={field.name}
              control={control}
              defaultValue={field.defaultValue || null}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  label={field.label}
                  value={value ? new Date(value) : null}
                  onChange={(date) => onChange(date?.toISOString().split('T')[0])}
                  placeholder="dd / mm / yyyy"
                  error={!!error}
                  errorMessage={errorMessage}
                  dateFormat="dd/MM/yyyy"
                />
              )}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Group fields into rows of 2, unless they have fullWidth: true
  const groupFieldsIntoRows = (fields: FormField[]) => {
    const rows: (FormField | FormField[])[] = [];
    let currentPair: FormField[] = [];

    fields.forEach(field => {
      if (field.fullWidth) {
        // If we have a pending pair, add it first
        if (currentPair.length > 0) {
          rows.push(currentPair);
          currentPair = [];
        }
        // Add full width field as single item
        rows.push(field);
      } else {
        currentPair.push(field);
        // If pair is complete, add it to rows
        if (currentPair.length === 2) {
          rows.push(currentPair);
          currentPair = [];
        }
      }
    });

    // Add any remaining single field
    if (currentPair.length > 0) {
      rows.push(currentPair);
    }

    return rows;
  };

  const fieldRows = groupFieldsIntoRows(fields);

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-[80vh] justify-between">
        <div className="flex-1 space-y-8">
          {fieldRows.map((row, index) => {
            // Single field (full width)
            if (!Array.isArray(row)) {
              return renderField(row);
            }
            
            // Pair of fields (in same row)
            if (row.length === 2) {
              return (
                <div key={`row-${index}`} className="flex flex-col md:flex-row gap-4">
                  {row.map(field => renderField(field, true))}
                </div>
              );
            }
            
            // Single field in array (half width but alone)
            if (row.length === 1) {
              return (
                <div key={`row-${index}`} className="flex flex-col md:flex-row gap-4">
                  {renderField(row[0], true)}
                  <div className="hidden md:block md:flex-1"></div>
                </div>
              );
            }
            
            return null;
          })}
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="button"
            variant="tertiary"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            showArrow
            disabled={!isValid}
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;