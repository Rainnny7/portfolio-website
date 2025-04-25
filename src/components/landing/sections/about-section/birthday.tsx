import dayjs, { Dayjs } from "dayjs";
import { ReactElement, useEffect, useState } from "react";
import SimpleTooltip from "~/components/simple-tooltip";

const birthDate: Dayjs = dayjs("2002-11-13");

const Birthday = (): ReactElement => {
    const [milliseconds, setMilliseconds] = useState(dayjs().diff(birthDate));

    // Refresh the millis in the tooltip every 100ms
    useEffect(() => {
        const interval = setInterval(
            () => setMilliseconds(dayjs().diff(birthDate)),
            100
        );
        return () => clearInterval(interval);
    }, []);

    return (
        <SimpleTooltip content={`My human uptime is ${milliseconds} millis (:`}>
            <b className="text-primary/85 hover:text-primary transition-colors transform-gpu">
                {dayjs().diff(birthDate, "year")} year old
            </b>
        </SimpleTooltip>
    );
};
export default Birthday;
