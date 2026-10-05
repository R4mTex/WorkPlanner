import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { WorksiteInterface } from "@/interfaces/worksiteInterface";
import { worksiteStore } from "@/store/WorksiteStore";
import { useApi } from "@/hooks/useApi";
import FormSelect from "@/components/form/FormSelect";
import { getWorksiteType } from "@/api/worksiteType";

type WorksiteFormValues = Omit<WorksiteInterface, "start" | "end"> & {
    start: string;
    end: string;
    picture: string;
    formattedDuration?: string;
    duration?: number;
};

const WorksiteEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { worksite, setWorksiteById, updateWorksite } = worksiteStore();
    const [worksiteTypes, setWorksiteTypes] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<WorksiteFormValues>();

    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (id) setWorksiteById(parseInt(id));
    }, [id, setWorksiteById]);

    useEffect(() => {
        if (worksite) {
            setValue("worksiteTypes", worksite.worksiteTypes);
            for (const [key, value] of Object.entries(worksite)) {
                if (key === "start" || key === "end") {
                    setValue(
                        key as keyof WorksiteFormValues,
                        new Date(value as string).toISOString().slice(0, 16)
                    );
                } else if (key === "picture" && value) {
                    setValue("picture", value as string);
                    setPreview(value as string);
                } else {
                    setValue(key as keyof WorksiteFormValues, value as any);
                }
            }
        }
    }, [worksite, setValue]);

    const calculateDuration = (start: Date, end: Date) => {
        if (isNaN(start.getTime()) || isNaN(end.getTime()))
            return { formatted: "Durée invalide", raw: 0 };
        const durationMs = end.getTime() - start.getTime();
        if (durationMs < 0) return { formatted: "Dates incohérentes", raw: 0 };

        const totalHours = Math.floor(durationMs / (1000 * 60 * 60));
        const days = Math.floor(totalHours / 24);
        const hours = totalHours % 24;

        const formatted =
            (days > 0 ? `${days} jour${days > 1 ? "s" : ""}` : "") +
                (days > 0 && hours > 0 ? " et " : "") +
                (hours > 0 ? `${hours} heure${hours > 1 ? "s" : ""}` : "") ||
            "0 heure";

        return { formatted, raw: durationMs / (1000 * 60) };
    };

    const formatDateForDatetimeLocal = (date: Date) => {
        const pad = (n: number) => n.toString().padStart(2, "0");
        return (
            date.getFullYear() +
            "-" +
            pad(date.getMonth() + 1) +
            "-" +
            pad(date.getDate()) +
            "T" +
            pad(date.getHours()) +
            ":" +
            pad(date.getMinutes())
        );
    };

    const handleDateChange = (field: "start" | "end", value: Date) => {
        const formattedValue = formatDateForDatetimeLocal(value);
        setValue(field, formattedValue);

        const startValue = watch("start");
        const endValue = watch("end");
        if (startValue && endValue) {
            const startDate = new Date(startValue);
            const endDate = new Date(endValue);
            if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
                const { formatted, raw } = calculateDuration(
                    startDate,
                    endDate
                );
                setValue("duration", raw);
                setValue("formattedDuration", formatted);
            }
        }
    };

    const api = useApi();

    const handleImageUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const { data } = await api.post(
                "/upload/worksite-image",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setValue("picture", data.url);
            setPreview(data.url);
        } catch (error) {
            console.error("Upload image failed:", error);
        }
    };

    const onSubmit: SubmitHandler<WorksiteFormValues> = (data) => {
        const worksiteData: WorksiteInterface = {
            ...data,
            worksiteTypes: [
                {
                    worksiteTypeId: Number(data.worksiteTypes),
                },
            ],
            start: new Date(data.start),
            end: new Date(data.end),
            picture: data.picture,
        };

        updateWorksite(worksiteData);
        navigate(`/worksite/${worksiteData.id}/details/`);
    };

    const loadWorksiteTypes = async () => {
        const response = await getWorksiteType();

        setWorksiteTypes(response);
    };
    useEffect(() => {
        loadWorksiteTypes();
    }, []);

    if (!worksite)
        return (
            <div>
                Le chantier n'a pas été trouvé ou les détails sont en cours de
                chargement...
            </div>
        );

    const inputClass =
        "w-full py-3 px-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-[#DE6F00] focus:ring-2 focus:ring-[#DE6F00] text-primary dark:text-primary bg-personal-white dark:border-primary dark:focus:border-[#DE6F00] dark:focus:ring-[#DE6F00]";

    return (
        <div className="container mx-auto max-w-5xl mb-15">
            <h1>Modifier le chantier</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card">
                <div className="space-y-4.5">
                    <div>
                        {preview && (
                            <img
                                src={preview}
                                alt="Aperçu"
                                className="w-full h-35 object-cover rounded-xl shadow-md mb-5"
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Nom du chantier"
                            className={inputClass}
                        />
                        {errors.name && (
                            <span className="text-personal-red text-sm">
                                Ce champ est obligatoire
                            </span>
                        )}
                    </div>
                    <FormSelect
                        {...register("worksiteTypes", { required: true })}
                        errors={errors.worksiteTypes}
                        label="Type de chantier"
                        name="worksiteTypes"
                        options={worksiteTypes}
                        //value={watch("worksiteTypes")}
                    />
                    {errors.worksiteTypes && (
                        <span className="text-personal-red text-sm">
                            Ce champ est obligatoire
                        </span>
                    )}
                    <div>
                        <textarea
                            {...register("description", { required: true })}
                            placeholder="Description"
                            className={inputClass}
                        />
                        {errors.description && (
                            <span className="text-personal-red text-sm">
                                Ce champ est obligatoire
                            </span>
                        )}
                    </div>

                    <div>
                        <input
                            type="datetime-local"
                            {...register("start", { required: true })}
                            defaultValue={new Date(worksite.start)
                                .toISOString()
                                .slice(0, 16)}
                            onChange={(e) =>
                                handleDateChange(
                                    "start",
                                    new Date(e.target.value)
                                )
                            }
                            className={inputClass}
                        />
                        {errors.start && (
                            <span className="text-personal-red text-sm">
                                Ce champ est obligatoire
                            </span>
                        )}
                    </div>

                    <div>
                        <input
                            type="datetime-local"
                            {...register("end", { required: true })}
                            defaultValue={new Date(worksite.end)
                                .toISOString()
                                .slice(0, 16)}
                            onChange={(e) =>
                                handleDateChange(
                                    "end",
                                    new Date(e.target.value)
                                )
                            }
                            className={inputClass}
                        />
                        {errors.end && (
                            <span className="text-personal-red text-sm">
                                Ce champ est obligatoire
                            </span>
                        )}
                    </div>

                    <input
                        type="text"
                        value={watch("formattedDuration") ?? ""}
                        readOnly
                        className="w-full py-3 px-4 rounded-lg border-2 border-gray-200 bg-gray-100 text-primary"
                        placeholder="Durée calculée"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            {...register("streetNumber")}
                            placeholder="Numéro de rue"
                            className={inputClass}
                        />
                        <div>
                            <input
                                type="text"
                                {...register("streetName", { required: true })}
                                placeholder="Nom de la rue"
                                className={inputClass}
                            />
                            {errors.streetName && (
                                <span className="text-personal-red text-sm">
                                    Ce champ est obligatoire
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                {...register("postalCode", { required: true })}
                                placeholder="Code postal"
                                className={inputClass}
                            />
                            {errors.postalCode && (
                                <span className="text-personal-red text-sm">
                                    Ce champ est obligatoire
                                </span>
                            )}
                        </div>
                        <input
                            type="text"
                            {...register("city")}
                            placeholder="Ville"
                            className={inputClass}
                        />
                    </div>

                    <input
                        type="text"
                        {...register("country")}
                        placeholder="Pays"
                        className={inputClass}
                    />

                    <button
                        type="submit"
                        className="w-full py-3 px-6 rounded-lg text-white bg-[#DE6F00] hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-[#DE6F00] shadow-md transition duration-300 ease-in-out"
                    >
                        Enregistrer les modifications
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WorksiteEdit;
