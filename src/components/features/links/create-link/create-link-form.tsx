"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { LucideLink2 } from "lucide-react";

export default function CreateLinkForm() {
  return (
    <form>
      <FieldSet>
        <FieldTitle className="text-xl font-bold">Shorten an URL</FieldTitle>
        <FieldGroup>
          <Field>
            <FieldLabel>Original URL</FieldLabel>
            <FieldDescription>
              Enter the URL you want to shorten
            </FieldDescription>
            <InputGroup>
              <InputGroupInput name="url" placeholder="https://example.com" />
              <InputGroupAddon>
                <LucideLink2 />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel>Shortened URL</FieldLabel>
            <FieldDescription>Give your URL a custom alias</FieldDescription>
            <InputGroup>
              <InputGroupInput name="shortUrl" placeholder="example" />
              <InputGroupAddon>
                <LucideLink2 />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Button type="submit">Shorten URL</Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
