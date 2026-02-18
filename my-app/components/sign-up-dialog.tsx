"use client";

import { DialogClose,  DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Field, FieldGroup, FieldSet } from "./ui/field";

import { signUpSchema, signUpValues } from "@/lib/validations/auth";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 
import AuthFormDialogWrapper from "./auth-dialog-wrapper";

interface SignUpDialogProps {
    btnText?: string,
    btnClassName?: string
}

const SignUpDialog = ({
    btnText,
    btnClassName
}: SignUpDialogProps) => {
    const form = useForm<signUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: ""
        },
        mode: "onSubmit"
    });

    const { register, formState: { errors, isSubmitting }} = form;

    const onSubmit = (data: signUpValues) => {
        console.log(data);
    }

    return (
        <AuthFormDialogWrapper
            title="Sign Up"
            form={form}
            onSubmit={onSubmit}
            btnText={btnText}
            btnClassName={btnClassName}
        >
            <FieldSet>
                <FieldGroup>
                    <Field>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            {...register("email")}
                            id="email"
                            aria-invalid={errors.username ? "true" : "false"}
                            className={errors.username ? "border-red-500": ""} 
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </Field>
                    <Field>
                        <Label htmlFor="username">Username</Label>
                        <Input 
                            {...register("username")} 
                            id="username"
                            aria-invalid={errors.username ? "true" : "false"}
                            className={errors.username ? "border-red-500": ""} 
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </Field>
                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            {...register("password")} 
                            type="password" 
                            id="password"
                            aria-invalid={errors.username ? "true" : "false"}
                            className={errors.username ? "border-red-500": ""} 
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </Field>
                    <Field>
                        <Label htmlFor="confirmPassword">Confirm password</Label>
                        <Input 
                            {...register("confirmPassword")} 
                            type="password" 
                            id="confirmPassword"
                            aria-invalid={errors.username ? "true" : "false"}
                            className={errors.username ? "border-red-500": ""} 
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </Field>
                </FieldGroup>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" type="button">Cancel</Button>
                    </DialogClose>
                    <Button disabled={isSubmitting} type="submit">
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                </DialogFooter>
            </FieldSet>
        </AuthFormDialogWrapper>
    );
}

export default SignUpDialog;