import * as Yup from 'yup';
import { Phone } from 'phosphor-react';
import {
  Button,
  Checkbox,
  Fieldset,
  Form,
  Input,
  InputDateTimeLocal,
  InputFile,
  InputIcon,
  InputMultiFile,
  InputPassword,
  InputPhone,
  MultiSelect,
  PreviewFile,
  Radio,
  Select,
  Textarea,
} from '../components';
import { useForm } from '../hooks/useForm';

const schema = Yup.object({
  inputText: Yup.string().required('Input text error message.'),
  inputDateTimeLocal: Yup.string()
    .nullable()
    .required('Input date time local error message.'),
  inputPassword: Yup.string().required('Input password error message.'),
  inputIcon: Yup.string().required('Input icon error message.'),
  select: Yup.string().required('Select error message.'),
  multiSelect: Yup.array()
    .of(Yup.string())
    .min(1, 'Multi select error message.'),
  radio: Yup.string().required('Radio error message.'),
  textarea: Yup.string().required('Textarea error message.'),
});

export const FormPage = () => {
  const { fields, setFields, errors, isSubmiting, submit } = useForm({
    inputText: '',
    inputDateTimeLocal: null as Date | null,
    inputPassword: '',
    inputIcon: '',
    inputPhone: { number: '', whatsapp: false },
    select: '',
    multiSelect: [] as string[],
    radio: '',
    checkbox: false,
    textarea: '',
    inputFile: null as File | null,
    inputMultiFile: [] as File[],
  });

  const handleSubmit = submit(schema, async values => {
    console.log(values);
    throw new Error('Exception error test');
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 0' }}>
      <Form onSubmit={handleSubmit}>
        <Fieldset legend="Fieldset">
          <Input
            label="Input Text"
            name="inputText"
            error={errors?.inputText?.message}
            value={fields.inputText}
            onChange={value => setFields({ ...fields, inputText: value })}
          />
          <InputDateTimeLocal
            label="Input Date time local"
            name="inputDateTimeLocal"
            error={errors?.inputDateTimeLocal?.message}
            value={fields.inputDateTimeLocal}
            onChange={value =>
              setFields({ ...fields, inputDateTimeLocal: value })
            }
          />
        </Fieldset>
        <InputPassword
          label="Password"
          name="inputPassword"
          error={errors?.inputPassword?.message}
          value={fields.inputPassword}
          onChange={value => setFields({ ...fields, inputPassword: value })}
        />
        <InputIcon
          label="Input Icon"
          name="inputIcon"
          error={errors?.inputIcon?.message}
          value={fields.inputIcon}
          onChange={value => setFields({ ...fields, inputIcon: value })}
          icon={() => <Phone size={20} />}
        />
        <InputPhone
          label="Phone"
          name="inputPhone"
          value={fields.inputPhone.number}
          isWhatsapp={fields.inputPhone.whatsapp}
          toggleWhatsapp={() =>
            setFields({
              ...fields,
              inputPhone: {
                ...fields.inputPhone,
                whatsapp: !fields.inputPhone.whatsapp,
              },
            })
          }
          onChange={value =>
            setFields({
              ...fields,
              inputPhone: { ...fields.inputPhone, number: value },
            })
          }
        />
        <Select
          label="Select"
          name="select"
          error={errors?.select?.message}
          value={fields.select}
          onChange={value => setFields({ ...fields, select: value })}
          options={[
            { label: 'option-1', value: 'option-1' },
            { label: 'option-2', value: 'option-2' },
          ]}
        />
        <MultiSelect
          label="Multi Select"
          name="multiselect"
          error={errors?.multiSelect?.message}
          value={fields.multiSelect}
          onChange={value => setFields({ ...fields, multiSelect: value })}
          options={[
            { label: 'option-1', value: 'option-1' },
            { label: 'option-2', value: 'option-2' },
          ]}
        />
        <Radio
          name="Radio"
          error={errors?.radio?.message}
          value={fields.radio}
          onChange={value => setFields({ ...fields, radio: value })}
          options={[
            { label: 'item-1', value: 'item-1' },
            { label: 'item-2', value: 'item-2' },
          ]}
        />
        <Checkbox
          label="Checkbox"
          name="checkbox"
          checked={fields.checkbox}
          onChange={value => setFields({ ...fields, checkbox: value })}
        />
        <Textarea
          label="Textarea"
          name="textarea"
          error={errors?.textarea?.message}
          value={fields.textarea}
          onChange={value => setFields({ ...fields, textarea: value })}
        />
        <InputFile
          label="File"
          name="file"
          value={fields.inputFile}
          onChange={fileList =>
            fileList && setFields({ ...fields, inputFile: fileList[0] })
          }
        />

        {fields.inputFile && (
          <PreviewFile
            files={[
              {
                fileName: fields.inputFile.name,
                mimetype: fields.inputFile.type,
                url: URL.createObjectURL(fields.inputFile),
              },
            ]}
          />
        )}

        <InputMultiFile
          label="Multi file"
          name="multifile"
          value={fields.inputMultiFile}
          onChange={fileList =>
            fileList &&
            setFields({
              ...fields,
              inputMultiFile: [
                ...fields.inputMultiFile,
                ...Array.from(fileList),
              ],
            })
          }
        />

        {fields.inputMultiFile && (
          <PreviewFile
            files={fields.inputMultiFile.map(file => ({
              fileName: file.name,
              mimetype: file.type,
              url: URL.createObjectURL(file),
            }))}
            removeFiles={index =>
              setFields(state => ({
                ...state,
                inputMultiFile: state.inputMultiFile?.filter(
                  (_, i) => i !== index,
                ),
              }))
            }
          />
        )}

        <Button type="submit" background="secondary" disabled={isSubmiting}>
          Submit Button
        </Button>
      </Form>
    </div>
  );
};
