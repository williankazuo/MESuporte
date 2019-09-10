import { ObservationModel, SubjectModel } from '../../models/new-called/new-called.model';

export const AutomaticOBSUpdateData: ObservationModel = {
    text: 'Observação automática. Atualização de cadastro.',
    titles: Array<SubjectModel>()
};



export const AutomaticOBSAttachDependent: ObservationModel = {
    text: 'Observação automática. Vínculo de dependente.',
    titles: Array<SubjectModel>()
};


export const AutomaticOBSAddDependent: ObservationModel = {
    text: 'Observação automática. Cadastro de dependente,',
    titles: Array<SubjectModel>()
};

export const AutomaticSubject: SubjectModel = {
    descTitle: 'Automático',
    isOther: true,
    id: 0
};

