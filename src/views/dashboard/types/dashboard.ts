/**
 * dashborad新建工具列表
 * 0: 新建文件夹
 * 1: 新建文件
 * 2: 导入文件
 */
export enum AddNewToolName {
    NEW_FOLDER = 0,
    NEW_FILE = 1,
    IMPORT_FILE = 2,
}

export type IAddNewToolProps = {
    name: string,
    index: number,
    comment: string,
    icon: string,
    target: string,
}

export type IFileDisplayProps = {
    
}