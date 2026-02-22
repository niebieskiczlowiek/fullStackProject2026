"use client";

import SignUpForm from "@/components/sign-up-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignUpPage() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm 
            footer={({ isSubmitting }) => (
              <CardFooter className="justify-center">
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </CardFooter>
            )}
          />
        </CardContent>
      </Card>
  );
}
