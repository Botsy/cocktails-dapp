import { FC } from 'react';
import {
  DialogContent,
  DialogRoot,
  DialogCloseTrigger,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogActionTrigger,
} from '@components/ui/dialog';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, HStack, Input } from '@chakra-ui/react';
import { NumberInputField, NumberInputRoot } from '@components/ui/number-input';
import { Field } from '@components/ui/field';
import { useCocktailContract } from '@hooks/contract';
import { toaster } from '@components/ui/toaster';
import { handleAppError } from '@tools/utils/error-handle';

interface Props {
  show: boolean;
  onClose: () => void;
}
interface FormValues {
  name: string;
  imageUrl: string;
  category: string;
  alcoholPercentage: number;
  cocktailType: string;
  price: number;
}

const AddCocktailDialog: FC<Props> = ({ show, onClose }) => {
  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      imageUrl: '',
      category: '',
      cocktailType: '',
    },
  });

  const { addCocktail } = useCocktailContract();

  const onSubmit = (data: FormValues) => {
    console.log('Form Data:', data);
    addCocktail(
      data.name,
      data.imageUrl,
      data.category,
      data.alcoholPercentage,
      data.cocktailType,
      data.price
    )
      .then(() => {
        toaster.create({
          description: `${data.name} was successfully added.`,
          type: 'success',
        });
        reset();
        onClose();
      })
      .catch((error: unknown) => {
        const handledError = handleAppError(error);
        toaster.create({
          description: handledError.message,
          type: 'error',
        });
      });
  };

  const handleClose = () => {
    clearErrors();
    onClose();
  };

  return (
    <DialogRoot
      size={['sm', 'md', 'lg']}
      lazyMount
      open={show}
      onOpenChange={handleClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle textAlign="center">Add Cocktail</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            maxWidth="lg"
            mx="auto"
            mt={4}
          >
            {/* Name Field */}
            <Field
              mb={4}
              label="Name"
              invalid={!!errors.name}
              errorText={errors.name?.message}
            >
              <Input {...register('name', { required: 'Name is required' })} />
            </Field>

            {/* Image URL Field */}
            <Field
              mb={4}
              label="Image URL"
              invalid={!!errors.imageUrl}
              errorText={errors.imageUrl?.message}
            >
              <Input
                {...register('imageUrl', { required: 'Image URL is required' })}
              />
            </Field>

            {/* Category Field */}
            <Field
              mb={4}
              label="Category"
              invalid={!!errors.category}
              errorText={errors.category?.message}
            >
              <Input
                {...register('category', { required: 'Category is required' })}
              />
            </Field>

            {/* Alcohol Percentage Field */}
            <Field
              mb={4}
              label="Alcohol percentage"
              invalid={!!errors.alcoholPercentage}
              errorText={errors.alcoholPercentage?.message}
            >
              <Controller
                name="alcoholPercentage"
                control={control}
                render={({ field }) => (
                  <NumberInputRoot
                    width="100%"
                    disabled={field.disabled}
                    name={field.name}
                    min={0}
                    value={field.value?.toString()}
                    onValueChange={({ value }) => {
                      field.onChange(value);
                    }}
                  >
                    <NumberInputField onBlur={field.onBlur} />
                  </NumberInputRoot>
                )}
                rules={{
                  required: 'Alcohol percentage is required',
                }}
              />
            </Field>

            {/* Cocktail Type Field */}
            <Field
              mb={4}
              label="Cocktail type"
              invalid={!!errors.cocktailType}
              errorText={errors.cocktailType?.message}
            >
              <Input
                {...register('cocktailType', {
                  required: 'Cocktail type is required',
                })}
              />
            </Field>

            {/* Price Field */}
            <Field
              mb={8}
              label="Price"
              invalid={!!errors.price}
              errorText={errors.price?.message}
            >
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <NumberInputRoot
                    width="100%"
                    disabled={field.disabled}
                    name={field.name}
                    value={field.value?.toString()}
                    min={0}
                    onValueChange={({ value }) => {
                      field.onChange(value);
                    }}
                  >
                    <NumberInputField onBlur={field.onBlur} />
                  </NumberInputRoot>
                )}
                rules={{
                  required: 'Price is required',
                }}
              />
            </Field>

            <HStack gap={4} justifyContent="center" mb={4}>
              <DialogActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogActionTrigger>
              <Button type="submit" disabled={isSubmitting}>
                Add cocktail
              </Button>
            </HStack>
          </Box>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default AddCocktailDialog;
