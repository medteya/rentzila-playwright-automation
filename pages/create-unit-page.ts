import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { acceptDialog } from '../utils/dialog-handler'

export class CreateUnitPage extends BasePage {
    protected readonly url = process.env.CREATE_UNIT_URL!;

    constructor(page: Page) {
        super(page)
    }

    public get categoryField(): Locator {
        return this.page.getByTestId('buttonDiv');
    }
    public get categoryPopup(): Locator {
        return this.page.getByTestId('categoryPopupWrapper');
    }

    public get popupConstructionMachinary(): Locator {
        return this.categoryPopup.getByTestId('list__budivelna-tekhnika');
    }

    public get popupSubcategoryItems(): Locator {
        return this.categoryPopup.getByTestId('namesBlock');
    }

    public get popupThirdCategoryLevelItem(): Locator {
        return this.categoryPopup.getByTestId('thirdCategoryLabel');
    }

    public get unitNameField(): Locator {
        return this.page.getByTestId('custom-input').first();
    }

    public get producerSearchField(): Locator {
        return this.page.locator('[class^="CustomSelectWithSearch_wrapper"]');
    }

    public get producerSearchDropdownItems(): Locator {
        return this.page.getByTestId('item-customSelectWithSearch');
    }

    public get producerSelected(): Locator {
        return this.page.getByTestId('div-service-customSelectWithSearch');
    }

    public get addressField(): Locator {
        return this.page.getByTestId('mapLabel');
    }

    public get mapPopup(): Locator {
        return this.page.getByTestId('div-mapPopup');
    }

    public get mapPopupSelectBtn(): Locator {
        return this.mapPopup.locator('[class^="MapPopup_btns"]').locator('[class^="ItemButtons"]').last();
    }

    public get nextBtn(): Locator {
        return this.page.getByTestId('nextButton');
    }

    public get prevBtn(): Locator {
        return this.page.getByTestId('prevButton');
    }

    public get bodyTitle(): Locator {
        return this.page.locator('[class^="CreateEditFlowLayout_title"]');
    }

    public get tabButtons(): Locator {
        return this.page.getByRole('tab');
    }

    public get tabNumbers(): Locator {
        return this.page.getByTestId('label');
    }

    public get imageBlocks(): Locator {
        return this.page.getByTestId('imageBlock');
    }

    public get imageInput(): Locator {
        return this.page.getByTestId('input_ImagesUnitFlow');
    }

    public get imageHint(): Locator {
        return this.page.getByTestId('description');
    }

    public get serviceSearchField(): Locator {
        return this.page.getByTestId('searchResult');
    }

    public get serviceSearchDropdownItems(): Locator {
        return this.page.getByTestId('searchItem-servicesUnitFlow');
    }

    public get selectedService(): Locator {
        return this.page.getByTestId('item-servicesUnitFlow');
    }

    public get priceField(): Locator {
        return this.page.getByTestId('priceInput_RowUnitPrice').first();
    }

    public get noPriceError(): Locator {
        return this.page.getByTestId('div_required_RowUnitPrice');
    }

    public get userInfoCompanyType(): Locator {
        return this.page.getByTestId('div_CustomSelect');
    }

    public get errorText(): Locator {
        return this.page.getByTestId('errorPopup');
    }

    public get photoErrCrossBtn(): Locator {
        return this.page.getByTestId('crossIcon').last();
    }

    public get backgroundOutsidePopup(): Locator {
        return this.page.getByTestId('wrapper')
    }
    
    public get uploadedImage(): Locator {
        return this.page.locator('[class*="ImagesUnitFlow_fullSize"]')
    } 

    public get saveBtn(): Locator {
        return this.page.locator('[class^="NotValidImagePopup_buttonContainer"]').locator('button[class^="ItemButtons"]')
    } 

    public async acceptDialogMsg(): Promise<void> {
        await acceptDialog(this.page, () => this.prevBtn.click())
    }
        
    public getinputError(fieldLocator: Locator): Locator {
        return fieldLocator.locator('xpath=following-sibling::div[1]');
    }

    public getTabTextLocator(tabNumberLocator: Locator): Locator {
        return tabNumberLocator.locator('xpath=following-sibling::span[1]');
    }
    public async typeInField(fieldLocator: Locator, text: string): Promise<void> {
        await fieldLocator.click();
        await fieldLocator.pressSequentially(text);
    }

    public async setCategory(): Promise<void> {
        await this.categoryField.click();
        await this.categoryPopup.waitFor({ state: 'visible' });
        await this.popupConstructionMachinary.click();
        await this.popupSubcategoryItems.first().waitFor({ state: 'visible' });
        await this.popupSubcategoryItems.first().click();
        await this.popupThirdCategoryLevelItem.first().waitFor({ state: 'visible' });
        await this.popupThirdCategoryLevelItem.first().click();
    }

    public async fillDataInRequiredFields(name: string, producer: string, addressPlaceholder: string): Promise<void> {
        await this.setCategory();

        await this.unitNameField.fill(name);
        await this.typeInField(this.producerSearchField, producer);
        await this.producerSearchDropdownItems.first().waitFor({ state: 'visible' });
        await this.producerSearchDropdownItems.first().click();

        await this.addressField.click();
        await this.mapPopup.waitFor({ state: 'visible' });
        await this.mapPopupSelectBtn.click();

        await this.mapPopup.waitFor({ state: 'hidden' });
        await this.addressField.filter({ hasNotText: addressPlaceholder }).waitFor();

        await this.nextBtn.click();
    }

    async uploadImages(...files: string[]): Promise<void> {
        await this.imageInput.setInputFiles(files);
    }
}