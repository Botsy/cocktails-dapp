import { Cocktail } from '@tools/types/cocktails';
import { FC } from 'react';
import {
  DialogContent,
  DialogRoot,
  DialogCloseTrigger,
} from '@components/ui/dialog';
import CocktailCard from './cocktail-card';
import { Skeleton } from '@components/ui/skeleton';
import { HStack, Stack } from '@chakra-ui/react';

interface Props {
  cocktail?: Cocktail | null;
  isLoading: boolean;
  show: boolean;
  onClose: () => void;
}

const CocktailDialog: FC<Props> = ({ isLoading, cocktail, show, onClose }) => {
  return (
    <DialogRoot
      size={['sm', 'md', 'lg']}
      lazyMount
      open={show}
      onOpenChange={onClose}
    >
      <DialogContent>
        {isLoading || !cocktail ? (
          <HStack alignItems="stretch">
            <Stack flex="1" p={5} justifyContent="flex-start">
              <Skeleton h={6} width="70%" />
              <Skeleton h={3} width="50%" mb={5} />
              <Skeleton h={10} width="50%" />
              <Skeleton h={30} width="90%" />
            </Stack>
            <Skeleton height={250} width="50%" />
          </HStack>
        ) : (
          <CocktailCard cocktail={cocktail} showDescription />
        )}
        <DialogCloseTrigger
          bg="white/60"
          _hover={{ background: 'white/100' }}
          colorScheme="revert"
        />
      </DialogContent>
    </DialogRoot>
  );
};

export default CocktailDialog;
