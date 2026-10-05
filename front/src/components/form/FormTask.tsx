import { JSX, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { taskInterface } from "@/interfaces/taskInterface";
import { useTasksStore } from "@/store/tasksStore";

import ButtonCancel from "../ui/btn/ButtonCancel";
import ButtonValide from "../ui/btn/ButtonValide";

import FormSelect from "./FormSelect";
import FormTextArea from "./FormTextArea";
import InputForm from "./InputForm";

const FormTask = ({ task }: { task?: taskInterface }): JSX.Element => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const worksiteId = Number(id);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<taskInterface>({
        defaultValues: {
            name: "",
            description: "",
            duration: undefined,
            start: new Date(),
            end: new Date(),
            status: "",
            worksiteId: worksiteId,
        },
    });
    const { addTask, updateTask } = useTasksStore();

    useEffect(() => {
        if (task) {
            setValue("id", task.id || 0);
            setValue("name", task.name || "");
            setValue("description", task.description || "");
            setValue("duration", task.duration || 0);
            setValue("start", task.start);
            setValue("end", task.end);

            setValue("status", task.status || "InProgress");
            setValue("worksiteId", task.worksiteId || 0);
        }
    }, [task, setValue]);

    const handleSubmitForm = async (data: taskInterface) => {
        try {
            const taskData: taskInterface = {
                ...(data as any),
                start: new Date(data.start),
                end: new Date(data.end),
            };

            if (task?.id) {
                await updateTask(task.id, taskData);
            } else {
                await addTask(taskData);
            }
            navigate(-1);
        } catch (error) {
            console.error("Erreur lors de l'envoi du formulaire :", error);
        }
    };

    return (
        <div className="w-full md:w-3xl lg:w-2xl xl:w-xl m-auto mb-10">
            <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
                <InputForm
                    {...register("name", { required: true })}
                    errors={errors.name}
                    name="name"
                    label="Nom de la tâche"
                    type="text"
                />
                <FormSelect
                    {...register("status", {
                        required: true,
                    })}
                    errors={errors.status}
                    label="Status"
                    name="status"
                    options={[
                        { name: "En progression", id: "InProgress" },
                        { name: "En attente", id: "OnHold" },
                        { name: "Fini", id: "Finished" },
                    ]}
                />

                <InputForm
                    {...register("start", {
                        required: true,
                    })}
                    errors={errors.start}
                    name="start"
                    label="Date de début"
                    type="datetime-local"
                />

                <InputForm
                    {...register("end", {
                        required: true,
                    })}
                    errors={errors.end}
                    name="end"
                    label="Date de fin"
                    type="datetime-local"
                />

                <FormTextArea
                    {...register("description", {
                        required: true,
                        maxLength: 500,
                    })}
                    errors={errors.description}
                    name="description"
                    label="Description"
                />

                <div className="flex justify-between mt-4">
                    <ButtonCancel />
                    <ButtonValide />
                </div>
            </form>
        </div>
    );
};

export default FormTask;
