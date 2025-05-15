import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form } from "@/components/ui/form";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { format } from "date-fns";

import toast from "react-hot-toast";

import {
  DatePickerField,
  TextInputField,
} from "./admin-portal/AddEventFormFields";
import { EventFormSchema } from "./admin-portal/EventFormSchema";

const TableFilters = ({
  addContent,
  searchValue,
  setSearchValue,
  sortBy,
  setSortBy,
}: {
  addContent: string;
}) => {
  const [openModal, setOpenModal] = useState(false);
  // const { mutate: addPatient, isPending: isSubmitting } = useAddPatient();

  const form = useForm<EventFormData>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: {
      name: "",
      venue: "",
      description: "",
      category: "",
      date: "",
      price: 0,
      image: "",
      tags: [],
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: EventFormData) {
    const eventData = {
      name: values.name,
      venue: values.venue,
      description: values.description,
      category: values.category,
      date: format(new Date(values.date), "yyyy-MM-dd"),
      price: values.price,
      image: values.image,
      tags: values.tags,
    };
    // addPatient(patientData, {
    //   onSuccess: () => {
    //     toast.success("Patient added successfully!");
    //     setOpenModal(false);
    //     form.reset();
    //   },
    //   onError: (error) => {
    //     console.error("Error adding patient:", error);
    //   },
    // });
  }

  return (
    <>
      {/*Sort By Select*/}
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[200px] cursor-pointer">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="z-auto bg-sidebar-background text-sidebar-foreground border-sidebar-background cursor-pointer ">
          <SelectGroup>
            <SelectLabel>Name</SelectLabel>
            <SelectItem className="cursor-pointer" value="name-asc">
              Sort by name (A-Z)
            </SelectItem>
            <SelectItem className="cursor-pointer" value="name-desc">
              Sort by name (Z-A)
            </SelectItem>
            <SelectSeparator />
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Age</SelectLabel>
            <SelectItem className="cursor-pointer" value="age-asc">
              Sort by age (0-99)
            </SelectItem>
            <SelectItem className="cursor-pointer" value="age-desc">
              Sort by age (99-0)
            </SelectItem>
            <SelectSeparator />
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Joining</SelectLabel>
            <SelectItem className="cursor-pointer" value="createdAt-asc">
              Oldest first
            </SelectItem>
            <SelectItem className="cursor-pointer" value="createdAt-desc">
              Newest first
            </SelectItem>
            <SelectSeparator />
          </SelectGroup>
        </SelectContent>
      </Select>
      {/*Search Input*/}
      <Input
        placeholder="Search by name or by email address"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {/*Add Patient Button*/}
      <Button
        onClick={() => setOpenModal(!openModal)}
        className="bg-primary text-primary-foreground hover:bg-muted hover:text-muted-foreground"
      >
        <Plus />
        {addContent}{" "}
      </Button>

      {/*Add Patient Modal*/}
      <Dialog open={openModal} onOpenChange={(value) => setOpenModal(value)}>
        <DialogContent className="bg-sidebar-background border-black  ">
          <DialogHeader>
            <DialogTitle className="text-muted-foreground">
              Add Event
            </DialogTitle>
            <DialogDescription>
              Such as event name, date, venue, and description.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 text-muted-foreground"
            >
              {/* Name Field */}
              <TextInputField
                control={form.control}
                name="name"
                label="Name"
                placeholder="John Doe"
              />

              <div className="flex items-center gap-5">
                {/* Date of Birth Field */}
                <div className="mt-2">
                  <DatePickerField
                    control={form.control}
                    name="dob"
                    label="Date of Birth"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  className="rounded bg-destructive text-destructive-foreground"
                  onClick={() => {
                    setOpenModal(false);
                    form.reset();
                  }}
                  // disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  // disabled={isSubmitting}
                  className="rounded hover:bg-blue-800"
                  type="submit"
                >
                  {/* {isSubmitting ? "Submitting..." : "Submit"} */}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TableFilters;
