import moment from "moment";
import { EmploymentRepository } from "../../db/contracts/EmploymentRepository";
import { IUpdateEmployment, TEmployment } from "../../entities/Employment";
import { TUser } from "../../entities/User";

export class UpdateEmployment {
	constructor(readonly repository: EmploymentRepository) {}

	execute = async (employment: IUpdateEmployment, user: TUser): Promise<TEmployment> => {
		const employmentDetails = await this.repository.get(employment.id);

		if (employment.periodIsSpecial) {
			var duration = this.calcSpecialDuration(employment);
		} else {
			var duration = this.calcDuration(employment);
		}

		if (employment.considerGracePeriod) employment.gracePeriodMonths = this.calcGracePeriod(employment);

		employment.durationYears = duration.years;
		employment.durationMonths = duration.months;
		employment.durationDays = duration.days;

		return await this.repository.update(employment);
	};

	private calcDuration = (employment: IUpdateEmployment) => {
		let startDate = moment(employment.startDate);
		let endDate = moment(employment.endDate).add(1, "days");

		let years: number;
		let months: number;
		let days: number;

		if (startDate.isSame(endDate, "day")) {
			years = 0;
			months = 0;
			days = 0;
		} else {
			years = endDate.diff(startDate, "years");
			startDate.add(years, "years");

			months = endDate.diff(startDate, "months");
			startDate.add(months, "months");

			days = endDate.diff(startDate, "days");
		}

		return { years, months, days };
	};

	private calcGracePeriod = (employment: IUpdateEmployment) => {
		let [startYear, startMonth, startDay] = moment.utc(employment.startDate).format("YYYY-MM-DD").split("-");
		let [endYear, endMonth, endDay] = moment.utc(employment.endDate).format("YYYY-MM-DD").split("-");

		let counted: any = [];
		let year = +startYear;
		let month = +startMonth;

		while (year < +endYear) {
			if (month < 12) {
				counted.push(`${month}/${year}`);
				month = month + 1;
			} else {
				counted.push(`${month}/${year}`);
				month = 1;
				year = year + 1;
			}
		}
		if (year == +endYear) {
			while (month < +endMonth) {
				counted.push(`${month}/${year}`);
				month = month + 1;
			}
			if (month == +endMonth) {
				counted.push(`${month}/${year}`);
			}
		}
		return counted.length;
	};

	private calcSpecialDuration = (employment: IUpdateEmployment) => {
		let startDate = moment(employment.startDate);
		let endDate = moment(employment.endDate).add(1, "days");

		let years: number;
		let months: number;
		let days: number;

		if (startDate.isSame(endDate, "day")) {
			years = 0;
			months = 0;
			days = 0;
		} else {
			years = endDate.diff(startDate, "years");
			startDate.add(years, "years");

			months = endDate.diff(startDate, "months");
			startDate.add(months, "months");

			days = endDate.diff(startDate, "days");
		}

		let totalDays = days + months * 30 + years * 360;

		//assuming customer is male, otherwise change 1.4 to 1.2
		totalDays = Math.floor(totalDays * 1.4);
		months = Math.floor(totalDays / 30);
		days = totalDays - months * 30;
		years = Math.floor(months / 12);
		months = months - years * 12;

		return { years, months, days };
	};
}
