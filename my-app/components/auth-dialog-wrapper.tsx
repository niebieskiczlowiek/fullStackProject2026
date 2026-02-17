"use client";

import { 
    Dialog, 
    DialogClose, 
    DialogContent, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from "./ui/dialog";
import { Button } from "./ui/button";

import { UseFormReturn, FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { ReactNode, useState } from "react";

interface AuthFormDialogWrapperProps<T extends FieldValues> {
    title: string,
    form: UseFormReturn<T>,
    onSubmit: (data: T) => void,
    btnText?: string,
    btnClassName?: string
    children: ReactNode
}

const AuthFormDialogWrapper = <T extends FieldValues>({
    title,
    form,
    onSubmit,
    btnText,
    btnClassName,
    children
}: AuthFormDialogWrapperProps<T>) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={btnClassName ? btnClassName : ""} asChild>
                <Button variant="outline">{btnText ? btnText : title}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={form.handleSubmit((data) => {
                    onSubmit(data);
                    setOpen(false);
                })}>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    {children}
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AuthFormDialogWrapper;