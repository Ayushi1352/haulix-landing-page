"use client";

import { useState } from "react";
import { site, type HaulixEnquiryFormData, type SectionProps } from "@/data";
import { useDummySubmit } from "@/components/useDummySubmit";
import Icon from "@/components/Icon";
import FormSuccess, { Spinner } from "@/components/FormSuccess";

/** Soft form fields */
const base =
  "w-full appearance-none rounded-xl border border-line bg-field px-4 text-sm text-ink outline-none transition-colors placeholder:text-subtle focus:border-brand";
/** single-line fields and selects share one height */
const field = `${base} h-12`;

function SelectField({ name, placeholder, options, required }: { name: string; placeholder: string; options: string[]; required?: boolean }) {
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <select
        name={name}
        required={required}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-label={placeholder}
        // shows the placeholder grey until an option is picked
        className={`${field} cursor-pointer pr-10 ${value === "" ? "text-subtle" : "text-ink"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-ink">
            {option}
          </option>
        ))}
      </select>
      <Icon name="chevron-down" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-brand" strokeWidth={2.2} />
    </div>
  );
}

/** The quote request form in the contact section */
export default function EnquiryForm({ data: form = site.enquiryFormSection }: SectionProps<HaulixEnquiryFormData>) {
  const submit = useDummySubmit();
  const { fields } = form;

  return (
    <>
      {/* remounting the form (via key) after each send clears every field, including the controlled selects */}
      <form
        key={submit.round}
        onSubmit={submit.onSubmit}
        onInput={submit.onInput}
        aria-busy={submit.sending}
        // on desktop the message box takes up any spare height of the contact section card
        className="mt-5 grid gap-3 sm:grid-cols-2 lg:flex-1 lg:grid-rows-[repeat(4,auto)_1fr_auto]"
      >
        <input name="name" required placeholder={fields.name} aria-label={fields.name} autoComplete="name" className={field} />
        <input name="phone" type="tel" required placeholder={fields.phone} aria-label={fields.phone} autoComplete="tel" className={field} />
        <input name="email" type="email" required placeholder={fields.email} aria-label={fields.email} autoComplete="email" className={field} />
        <input name="company" placeholder={fields.company} aria-label={fields.company} autoComplete="organization" className={field} />
        <SelectField name="serviceType" placeholder={fields.serviceType} options={form.serviceOptions} required />
        <SelectField name="shipmentType" placeholder={fields.shipmentType} options={form.shipmentOptions} />
        <SelectField name="origin" placeholder={fields.origin} options={form.cityOptions} required />
        <SelectField name="destination" placeholder={fields.destination} options={form.cityOptions} required />
        <textarea
          name="message"
          required
          rows={3}
          placeholder={fields.message}
          aria-label={fields.message}
          className={`${base} resize-y py-3 sm:col-span-2 lg:h-full`}
        />
        <button
          type="submit"
          disabled={submit.sending}
          className="flex h-12 items-center justify-center gap-3 rounded-full bg-brand font-display font-bold text-white transition-colors hover:bg-ink disabled:cursor-wait disabled:opacity-80 sm:col-span-2"
        >
          {submit.sending ? (
            <>
              <Spinner className="size-5" />
              {form.sending}
            </>
          ) : (
            <>
              {form.button}
              <Icon name="arrow-right" className="size-4.5" strokeWidth={2.2} />
            </>
          )}
        </button>
      </form>
      {submit.showMessage && (
        <FormSuccess
          name={submit.name}
          title={form.successTitle}
          message={form.success}
          leaving={submit.status === "leaving"}
          visibleFor={submit.visibleFor}
          onClose={submit.dismiss}
          closeLabel={form.closeLabel}
          className="mt-4"
        />
      )}
    </>
  );
}
