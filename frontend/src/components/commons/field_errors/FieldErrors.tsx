type FieldErrorsProps = {
    fieldName: string,
    httpError: string | null
}

export const FieldErrors = ({ fieldName, httpError } : FieldErrorsProps) => {

    const regex = `(?:${fieldName}:\\s([\\w.?\\s-]*))`;

    const fieldErrorsIterator = httpError?.matchAll(RegExp(regex, "gi"));

    const fieldErrors = [];

    if (fieldErrorsIterator) {

        for (const validationError of fieldErrorsIterator) fieldErrors.push(validationError[0]);
    }

    return (

        <>

            {fieldErrors.map(

                error => (

                    <div key={error} className="border border-red-500 py-1 px-2 bg-red-100 rounded-md">

                        {error.replace(RegExp(`${fieldName}: `), "")}

                    </div>

                )

            )}

        </>

    )

}