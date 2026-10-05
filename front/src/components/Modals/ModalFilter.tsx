import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function ModalFilter() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="bg-primary w-10 h-10 rounded-full right-5 bottom-30 fixed shadow shadow-gray-400 flex justify-center items-center cursor-pointer">
                    <Icon
                        icon="mdi:filter"
                        style={{
                            color: "white",
                            fontSize: "24px",
                        }}
                    />
                </div>
            </DialogTrigger>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>Fitre le chantier</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button type="submit">
                        <Icon className="svg" icon="material-symbols:check" />
                        Valider
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
