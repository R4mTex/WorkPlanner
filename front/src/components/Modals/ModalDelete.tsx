import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Icon } from "@iconify/react";
import { DialogClose } from "@radix-ui/react-dialog";
import { GoTrash } from "react-icons/go";

const ModalDelete = ({ label, onDelete }: { label: string; onDelete: any }) => {
	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="delete" data-cy-delete-button="delete-button">
						<GoTrash size={21} className="text-personal-red" />
					</Button>
				</DialogTrigger>
				<DialogContent className=" bg-white">
					<DialogHeader>
						<DialogTitle className="text-center">Suppresion</DialogTitle>
						<DialogDescription>
							Etes-vous certain de vouloir supprimer <strong>{label}</strong>
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="flex justify-between">
						<DialogClose asChild>
							<Button>
								<Icon className="svg" icon="radix-icons:cross-1" />
								Annuler
							</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button type="submit" onClick={onDelete} data-cy-confirm-delete-button="confirm-delete">
								<Icon className="svg" icon="material-symbols:check" />
								Valider
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ModalDelete;
