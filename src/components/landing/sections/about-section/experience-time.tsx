import dayjs, { Dayjs } from "dayjs";
import { ReactElement } from "react";
import SimpleTooltip from "~/components/simple-tooltip";

const experienceStartDate: Dayjs = dayjs("2016-09-01");

const ExperienceTime = (): ReactElement => (
    <SimpleTooltip
        content={`Orrrrr otherwise ${Math.floor(
            dayjs().diff(experienceStartDate) / (1000 * 60 * 60)
        )} hours (:`}
    >
        <b className="text-primary/85 hover:text-primary transition-colors transform-gpu">
            {dayjs().diff(experienceStartDate, "year")} years
        </b>
    </SimpleTooltip>
);
export default ExperienceTime;
