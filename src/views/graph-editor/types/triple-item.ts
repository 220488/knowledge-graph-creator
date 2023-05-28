export interface ITripleItemProps {
    headLabelText: string,
    relationLabelText: string,
    tailLabelText: string,
    headNodeId: number,
    relationLinkId: number,
    tailNodeId: number
}

export interface ITripleLabelItem {
    ThreeHeadLabel: {
        entityLabelId: string,
        entityLabel: string,
    },
    ThreeRelationLabel: {
        relationLabel: string,
        relationLabelId: string,
    },
    ThreeTailLabel: {
        entityLabelId: string,
        entityLabel: string,
    } 
}