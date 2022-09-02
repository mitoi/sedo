export enum Category {
    CONSTRUCTION = 'Constructii',
    AUTO = 'Auto',
    CLEANING = 'Menaj',
    OTHER = 'Altele'
}

export const CategoryMapping: Record<Category, string> = {
    [Category.CONSTRUCTION]: "Constructii",
    [Category.AUTO]: "Auto",
    [Category.CLEANING]: "Menaj",
    [Category.OTHER]: "Altele",
};