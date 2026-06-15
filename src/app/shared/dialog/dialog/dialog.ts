import { Component, inject, DestroyRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'; 

// 💡 الكومبوننت المراد عرضه داخل النافذة المنبثقة (مُنسق بـ Tailwind CSS)
@Component({
    selector: 'app-product-list-demo',
    standalone: true,
    template: `
        <div class="p-6 bg-white space-y-4" dir="rtl">
            <div class="border-b border-slate-100 pb-3">
                <h4 class="text-lg font-extrabold text-slate-800">اختر المنتج المناسب للمشروع</h4>
                <p class="text-xs text-slate-500 mt-1">يرجى تحديد أحد المنتجات المتاحة لإضافته إلى لوحة التحكم الخاصة بك.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="p-4 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50/30 cursor-pointer transition-all">
                    <span class="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md">برمجة مخصصة</span>
                    <h5 class="font-bold text-slate-700 mt-2">منظومة الأمان الرقمي v2</h5>
                    <p class="text-xs text-slate-500 mt-1">نظام تشفير وحماية متكامل لقواعد البيانات المحلية.</p>
                </div>

                <div class="p-4 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50/30 cursor-pointer transition-all">
                    <span class="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md">سحابي</span>
                    <h5 class="font-bold text-slate-700 mt-2">بوابة الدفع الإلكتروني</h5>
                    <p class="text-xs text-slate-500 mt-1">ربط وتكامل آمن مع جميع المصارف التجارية الليبية.</p>
                </div>
            </div>
        </div>
    `
})
export class ProductListDemo {}

// 💡 الكومبوننت الأساسي الذي يحتوي على زر الفتح والتوست
@Component({
    selector: 'app-dynamic-dialog-demo',
    standalone: true,
    template: `
        <div class="flex justify-center items-center p-8 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
            <p-toast />
            
            <button (click)="show()" 
                    class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <i class="pi pi-search text-white/90 group-hover:scale-110 transition-transform"></i>
                <span>قائمة المنتجات المتاحة</span>
            </button>
        </div>
    `,
    imports: [ButtonModule, ToastModule],
    providers: [DialogService, MessageService]
})
export class DynamicdialogExampleDemo {
    private dialogService = inject(DialogService);
    private messageService = inject(MessageService);
    private destroyRef = inject(DestroyRef); 

    ref: DynamicDialogRef | null | undefined;

    show() {
        this.ref = this.dialogService.open(ProductListDemo, {
            header: 'قائمة المنتجات المتاحة',
            modal: true,
            width: '50vw',
            closable: true,
            styleClass: 'rounded-2xl overflow-hidden shadow-2xl border border-slate-100 font-sans', 
            contentStyle: { overflow: 'auto' },
            breakpoints: {
                '960px': '75vw',
                '640px': '95vw'
            }
        });
        
        const closeSub = this.ref?.onClose.subscribe((data: any) => {
            let summary_and_detail;
            if (data) {
                const buttonType = data?.buttonType;
                summary_and_detail = buttonType 
                    ? { summary: 'No Product Selected', detail: `Pressed '${buttonType}' button` } 
                    : { summary: 'Product Selected', detail: data?.name };
            } else {
                summary_and_detail = { summary: 'No Product Selected', detail: 'Pressed Close button' };
            }
            this.messageService.add({ severity: 'info', ...summary_and_detail, life: 3000 });
        });
        
        this.destroyRef.onDestroy(() => {
            closeSub?.unsubscribe();
        });
    }
}