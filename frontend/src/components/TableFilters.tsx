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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

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
  SelectField,
  TextInputField,
} from "./admin-portal/AddEventFormFields";
import {
  EventFormSchema,
  type EventFormData,
} from "./admin-portal/EventFormSchema";
import { useAddEvents } from "@/hooks/events/useAddEvents";

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

  const { isPending: isSubmitting, mutate: addEvent } = useAddEvents();
  const form = useForm<EventFormData>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: {
      name: "",
      venue: "",
      description: "",
      category: "",
      date: null,
      price: 0,
      image: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: EventFormData) {
    // const eventData = {
    //   name: values.name,
    //   venue: values.venue,
    //   description: values.description,
    //   category: values.category,
    //   date: format(new Date(values.date), "yyyy-MM-dd"),
    //   price: values.price,
    //   image: values.image,
    // };
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("venue", values.venue);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("date", format(new Date(values.date), "yyyy-MM-dd"));
    formData.append("price", values.price.toString());
    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    // console.log("Event Data:", formData);
    console.log([...formData.entries()]);
    addEvent(formData, {
      onSuccess: () => {
        toast.success("Event added successfully!");
        setOpenModal(false);
        form.reset();
      },
      onError: (error) => {
        console.error("Error adding event:", error);
      },
    });
  }
  const categoryOptions = [
    { value: "music", label: "Music" },
    { value: "sports", label: "Sports" },
    { value: "art", label: "Art" },
    { value: "technology", label: "Technology" },
    { value: "other", label: "Other" },
  ];

  return (
    <>
      <div className="flex items-center justify-between gap-4 flex-grow mb-5">
        {/*Sort By Select*/}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[200px] cursor-pointer">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="z-auto  cursor-pointer ">
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
              <SelectLabel>price</SelectLabel>
              <SelectItem className="cursor-pointer" value="price-asc">
                Lowest to highest{" "}
              </SelectItem>
              <SelectItem className="cursor-pointer" value="price-desc">
                Highest to lowest{" "}
              </SelectItem>
              <SelectSeparator />
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Date</SelectLabel>
              <SelectItem className="cursor-pointer" value="date-asc">
                Nearest{" "}
              </SelectItem>
              <SelectItem className="cursor-pointer" value="date-desc">
                Farthest{" "}
              </SelectItem>
              <SelectSeparator />
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search by name or by email address"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          onClick={() => setOpenModal(!openModal)}
          className="bg-primary text-primary-foreground hover:bg-muted hover:text-muted-foreground"
        >
          <Plus />
          {addContent}{" "}
        </Button>
      </div>

      <Dialog open={openModal} onOpenChange={(value) => setOpenModal(value)}>
        <DialogContent>
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
              <div className="flex items-center justify-between">
                <TextInputField
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="Enter event name"
                />
                <TextInputField
                  control={form.control}
                  name="venue"
                  label="Venue"
                  placeholder="Enter venue"
                />
              </div>
              <TextInputField
                control={form.control}
                name="description"
                label="Description"
                placeholder="Enter description"
              />
              {/* <TextInputField
                control={form.control}
                name="price"
                label="Price"
                placeholder="Enter price"
              
              /> */}
              <FormField
                control={form.control}
                // name={price}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded"
                        placeholder={"Enter price"}
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <SelectField
                control={form.control}
                name="category"
                label="Category"
                placeholder="Select Category"
                options={categoryOptions}
              />
              <div className="flex items-center gap-5">
                <div className="mt-2">
                  <DatePickerField
                    control={form.control}
                    name="date"
                    label="Date"
                  />
                </div>
              </div>
              {/* Add Image Upload Field */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          field.onChange(file); // Update form state
                          // if (file) {
                          //   setImagePreview(URL.createObjectURL(file)); // Set image preview
                          // } else {
                          //   setImagePreview(null);
                          // }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-4">
                <Button
                  className="rounded bg-destructive text-destructive-foreground"
                  onClick={() => {
                    setOpenModal(false);
                    form.reset();
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isSubmitting}
                  className="rounded hover:bg-blue-800"
                  type="submit"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
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
