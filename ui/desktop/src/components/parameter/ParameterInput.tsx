import React from 'react';
import { Parameter } from '../../recipe';

interface ParameterInputProps {
  parameter: Parameter;
  onChange: (name: string, updatedParameter: Partial<Parameter>) => void;
}

const ParameterInput: React.FC<ParameterInputProps> = ({ parameter, onChange }) => {
  // All values are derived directly from props, maintaining the controlled component pattern
  const { key, description, requirement } = parameter;
  const defaultValue = parameter.default || '';

  return (
    <div className="parameter-input my-4 p-4 border rounded-lg bg-bgSubtle shadow-sm">
      <h3 className="text-lg font-bold text-textProminent mb-4">
        Parameter:{' '}
        <code className="bg-background-default px-2 py-1 rounded-md">{parameter.key}</code>
      </h3>

      <div className="mb-4">
        <label className="block text-md text-textStandard mb-2 font-semibold">description</label>
        <input
          type="text"
          value={description || ''}
          onChange={(e) => onChange(key, { description: e.target.value })}
          className="w-full p-3 border rounded-lg bg-background-default text-textStandard focus:outline-none focus:ring-2 focus:ring-borderProminent"
          placeholder={`E.g., "Enter the name for the new component"`}
        />
        <p className="text-sm text-textSubtle mt-1">This is the message the end-user will see.</p>
      </div>

      {/* Controls for requirement, input type, and default value */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-md text-textStandard mb-2 font-semibold">Input Type</label>
          <select
            className="w-full p-3 border rounded-lg bg-background-default text-textStandard"
            value={parameter.input_type || 'string'}
            onChange={(e) =>
              onChange(key, { input_type: e.target.value as Parameter['input_type'] })
            }
          >
            <option value="string">String</option>
            <option value="select">Select</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
          </select>
        </div>

        <div>
          <label className="block text-md text-textStandard mb-2 font-semibold">Requirement</label>
          <select
            className="w-full p-3 border rounded-lg bg-background-default text-textStandard"
            value={requirement}
            onChange={(e) =>
              onChange(key, { requirement: e.target.value as Parameter['requirement'] })
            }
          >
            <option value="required">Required</option>
            <option value="optional">Optional</option>
          </select>
        </div>

        {/* The default value input is only shown for optional parameters */}
        {requirement === 'optional' && (
          <div>
            <label className="block text-md text-textStandard mb-2 font-semibold">
              Default Value
            </label>
            <input
              type="text"
              value={defaultValue}
              onChange={(e) => onChange(key, { default: e.target.value })}
              className="w-full p-3 border rounded-lg bg-background-default text-textStandard"
              placeholder="Enter default value"
            />
          </div>
        )}
      </div>

      {/* Options field for select input type */}
      {parameter.input_type === 'select' && (
        <div className="mt-4">
          <label className="block text-md text-textStandard mb-2 font-semibold">
            Options (one per line)
          </label>
          <textarea
            value={(parameter.options || []).join('\n')}
            onChange={(e) => {
              // Don't filter out empty lines - preserve them so user can type on new lines
              const options = e.target.value.split('\n');
              onChange(key, { options });
            }}
            onKeyDown={(e) => {
              // Allow Enter key to work normally in textarea (prevent form submission or modal close)
              if (e.key === 'Enter') {
                e.stopPropagation();
              }
            }}
            className="w-full p-3 border rounded-lg bg-background-default text-textStandard focus:outline-none focus:ring-2 focus:ring-borderProminent"
            placeholder="Option 1&#10;Option 2&#10;Option 3"
            rows={4}
          />
          <p className="text-sm text-textSubtle mt-1">
            Enter each option on a new line. These will be shown as dropdown choices.
          </p>
        </div>
      )}
    </div>
  );
};

export default ParameterInput;
