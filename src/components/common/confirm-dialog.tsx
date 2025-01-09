import { Button } from '@chakra-ui/react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@components/ui/dialog';
import { FC, ReactNode } from 'react';

interface Props {
  show: boolean;
  setShow: (visible: boolean) => void;
  title: string;
  content: ReactNode | string;
  handleConfirm: () => void;
}

const ConfirmDialog: FC<Props> = ({
  show,
  setShow,
  title,
  content,
  handleConfirm,
}) => {
  return (
    <DialogRoot
      size="sm"
      lazyMount
      open={show}
      onOpenChange={(e) => setShow(e.open)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>{content}</DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default ConfirmDialog;
