export interface IMessagesResult {
    id: string;
    accountId: string;
    msgid: string;
    from: {
        address: string;
        name: string;
    };
    to: {
        address: string;
        name: string;
    };
    subject: string;
    intro: string;
    seen: boolean;
    isDeleted: boolean;
    hasAttachments: boolean;
    size: number;
    downloadUrl: string;
    createdAt: string;
    updatedAt: string;
}

export interface IMessageResult extends IMessagesResult {
    cc: string[];
    bcc: string[];
    flagged: boolean;
    isDeleted: boolean;
    verifications: string[];
    retention: boolean;
    retentionDate: string;
    text: string;
    html: string[];
    size: number;
}

export type domainType = {
    "@id": string;
    "@type": string;
    "id": string;
    "domain": string;
    "isActive": boolean;
    "isPrivate": boolean;
    "createdAt": string;
    "updatedAt": string
}

export type UserDateType = {
    '@id': string;
    id: string;
    address: string;
    password: string;
    token: string;
}