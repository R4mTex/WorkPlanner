import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const tagVariant = cva(
    "text-primary shadow-lg rounded px-2 mb-1 inline-block",
    {
        variants: {
            variant: {
                default: "bg-blue-500",
                renovation: "bg-blue-500",
                reparation: "bg-red-500",
                creation: "bg-green-500",
                demolition: "bg-orange-500",
            },
            defaultVariants: {
                variant: "default",
            },
        },
    }
);

function Tag({
    className,
    variant,
    asChild = false,
    ...props
}: React.ComponentProps<"p"> &
    VariantProps<typeof tagVariant> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "p";
    return (
        <Comp
            data-slot="p"
            className={cn(tagVariant({ variant, className }))}
            {...props}
        />
    );
}

export { Tag, tagVariant };
