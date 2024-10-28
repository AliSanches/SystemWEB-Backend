import moment from "moment";
import { EmploymentRepository } from "../../db/contracts/EmploymentRepository";
import { TEmployment } from "../../entities/Employment";
import { TUser } from "../../entities/User";
import { getContribuicaoTotal, getDuracaoCnis, ordenaCnis } from "../prevcalc/prevcalc2";
import { CalculaCarencias } from "../prevcalc/CalculaCarencias";

export class ListEmployment {
    constructor(readonly repository: EmploymentRepository) {}

    execute = async (customerId: number, user: TUser) => {
        let employments: any[] = await this.repository.list(customerId);

        if (employments.length <= 0)
            return { employments: [], gracePeriodMonths: 0, contribuicaoTotal: { anos: 0, meses: 0, dias: 0 } };

        ordenaCnis(employments);

        let gracePeriodMonths = CalculaCarencias.execute(employments);
        employments = this.formatDate(employments);

        let [contribuicaoAnos, contribuicaoMeses, contribuicaoDias] = getContribuicaoTotal(employments, "M");

        employments = employments.map((cnis) => {
            return getDuracaoCnis(cnis);
        });

        return {
            employments,
            gracePeriodMonths,
            contribuicaoTotal: { anos: contribuicaoAnos, meses: contribuicaoMeses, dias: contribuicaoDias },
        };
    };

    private formatDate = (employments) => {
        employments = employments.map((employment) => {
            let start = employment.startDate.toISOString().split("T")[0];
            let end = employment.endDate.toISOString().split("T")[0];

            return { ...employment, startDate: start, endDate: end };
        });

        return employments;
    };
}

