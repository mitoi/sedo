export enum Category {
    AUTO = 'Auto',
    CONSTRUCTION = 'Constructii',
    DEPOZIT = 'Depozit',
    GARDENING = 'Gradinarit',
    HORECA = 'Horeca',
    INSTALLATION = 'Instalatii',
    CLEANING = 'Menaj',
    DELIVERY = 'Transport',
    OTHER = 'Altele'
}

export const CategoryMapping: Record<Category, string> = {
    [Category.CONSTRUCTION]: "Constructii",
    [Category.GARDENING]: "Gradinarit",
    [Category.INSTALLATION]: "Instalatii",
    [Category.DELIVERY]: "Transport",
    [Category.AUTO]: "Auto",
    [Category.CLEANING]: "Menaj",
    [Category.HORECA]: "Horeca",
    [Category.DEPOZIT]: "Depozit",
    [Category.OTHER]: "Altele",
};

export const getType: any = function(label: any) {
    switch (label) {
        case 'Auto':
            return 'AUTO';   
        case 'Constructii':
            return 'CONSTRUCTION';   
        case 'Depozit':
            return 'DEPOZIT';   
        case 'Horeca':
            return 'HORECA';   
        case 'Gradinarit':
            return 'GARDENING';   
        case 'Instalatii':
            return 'INSTALLATION';   
        case 'Menaj':
            return 'CLEANING';   
        case 'Transport':
            return 'DELIVERY';   
        case 'Altele':
            return 'OTHER';   
    }

    return '';
};

export const CategoryArray: any = [
    {
        type: '',
        label: 'Toate',
        icon: 'list_alt'
    },
    {
        type: 'AUTO',
        label: 'Auto',
        icon: 'directions_car'
    },
    {
        type: 'CONSTRUCTION',
        label: 'Constructii',
        icon: 'home'
    },
    {
        type: 'DEPOZIT',
        label: 'Depozit',
        icon: 'warehouse'
    },
    {
        type: 'GARDENING',
        label: 'Gradinarit',
        icon: 'local_florist'
    },
    {
        type: 'HORECA',
        label: 'Horeca',
        icon: 'restaurant_menu'
    },
    {
        type: 'INSTALLATION',
        label: 'Instalatii',
        icon: 'plumbing'
    },
    {
        type: 'CLEANING',
        label: 'Menaj',
        icon: 'dry_cleaning'
    },
    {
        type: 'DELIVERY',
        label: 'Transport',
        icon: 'delivery_dining'
    },
    {
        type: 'OTHER',
        label: 'Altele',
        icon: 'miscellaneous_services'
    },
]