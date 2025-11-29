import React, { useState } from 'react';
import Button from '~/components/ui/button/button';
import { useNavigate } from 'react-router';
import { Icon } from '@iconify/react';

export default function PetRegistration() {
    const [step, setStep] = useState<number>(1);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        species: '',
        age: '' as string,
        breed: '',
        gender: '',
        color: '',
        city: '',
        sterilized: '' as 'yes' | 'no' | '',
        story: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [images, setImages] = useState(
        Array.from({ length: 4 }).map(() => ({ file: null as File | null, preview: '' as string | null, error: '' }))
    );

    React.useEffect(() => {
        return () => {
            images.forEach((img) => {
                if (img.preview) URL.revokeObjectURL(img.preview);
            });
        };
    }, []);

    function handleImageChange(index: number, file?: File | null) {
        const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
        const minSize = 240 * 1024; // 240KB
        const maxSize = 1024 * 1024; // 1024KB

        if (!file) {
            setImages((prev) => {
                const next = [...prev];
                if (next[index].preview) URL.revokeObjectURL(next[index].preview as string);
                next[index] = { file: null, preview: null, error: '' };
                return next;
            });
            return;
        }

        if (!allowed.includes(file.type)) {
            setImages((prev) => {
                const next = [...prev];
                next[index] = { file: null, preview: null, error: 'Formato inválido. Use jpg ou png.' };
                return next;
            });
            return;
        }

        if (file.size < minSize || file.size > maxSize) {
            setImages((prev) => {
                const next = [...prev];
                next[index] = { file: null, preview: null, error: 'Tamanho inválido. Deve ficar entre 240KB e 1024KB.' };
                return next;
            });
            return;
        }

        const url = URL.createObjectURL(file);
        const imgEl = new Image();
        imgEl.onload = () => {
            if (imgEl.width !== 600 || imgEl.height !== 600) {
                URL.revokeObjectURL(url);
                setImages((prev) => {
                    const next = [...prev];
                    next[index] = { file: null, preview: null, error: 'Dimensões inválidas. Deve ser 600x600.' };
                    return next;
                });
            } else {
                setImages((prev) => {
                    const next = [...prev];
                    // revoke previous preview if any
                    if (next[index].preview) URL.revokeObjectURL(next[index].preview as string);
                    next[index] = { file, preview: url, error: '' };
                    return next;
                });
            }
        };
        imgEl.onerror = () => {
            URL.revokeObjectURL(url);
            setImages((prev) => {
                const next = [...prev];
                next[index] = { file: null, preview: null, error: 'Não foi possível ler a imagem.' };
                return next;
            });
        };
        imgEl.src = url;
    }

    function update<K extends keyof typeof form>(key: K, value: typeof form[K]) {
        setForm((s) => ({ ...s, [key]: value }));
        setErrors((e) => ({ ...e, [key]: '' }));
    }

    function validateStep1() {
        const nextErrors: Record<string, string> = {};
        if (!form.name.trim()) nextErrors.name = 'Nome do pet é obrigatório.';
        if (!form.species.trim()) nextErrors.species = 'Espécie é obrigatória.';
        const ageNum = Number(form.age);
        if (form.age === '') nextErrors.age = 'Idade é obrigatória.';
        else if (Number.isNaN(ageNum) || ageNum < 0) nextErrors.age = 'Idade deve ser um número >= 0.';
        if (!form.breed.trim()) nextErrors.breed = 'Raça é obrigatória.';
        if (!form.gender) nextErrors.gender = 'Gênero é obrigatório.';
        if (!form.color.trim()) nextErrors.color = 'Cor é obrigatória.';
        if (!form.city) nextErrors.city = 'Cidade do dono é obrigatória.';
        if (!form.sterilized) nextErrors.sterilized = 'Campo obrigatório.';

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }

    function onContinueFromStep1() {
        if (validateStep1()) setStep(2);
    }

    return (
        <main className="flex flex-col items-center justify-center">
            <div className="w-full max-w-7xl p-10">

                {step === 1 && (
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onContinueFromStep1(); }}>
                        <h2 className="text-4xl font-extrabold mb-12 text-left">Informações Básicas</h2>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-base font-bold mb-1">Nome do Pet *</label>

                                <input
                                    type="text"
                                    placeholder="Pretinha..."
                                    value={form.name}
                                    onChange={(e) => update('name', e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div className="flex-1">
                                <label className="block text-base font-bold mb-1">Espécie *</label>
                                <input
                                    type="text"
                                    placeholder="Cachorro..."
                                    value={form.species}
                                    onChange={(e) => update('species', e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.species && <p className="text-red-600 text-sm mt-1">{errors.species}</p>}
                            </div>

                            <div className="w-40">
                                <label className="block text-base font-bold mb-1">Idade (Anos) *</label>
                                <input
                                    type="number"
                                    min={0}
                                    placeholder="0"
                                    value={form.age}
                                    onChange={(e) => update('age', e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.age && <p className="text-red-600 text-sm mt-1">{errors.age}</p>}
                                <p className="text-gray-500 text-xs mt-1">Se o seu animal de estimação for um filhote, adicione idade dele como 0.</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-base font-bold mb-1">Raça *</label>
                            <input
                                type="text"
                                placeholder="Labrador..."
                                value={form.breed}
                                onChange={(e) => update('breed', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.breed && <p className="text-red-600 text-sm mt-1">{errors.breed}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-base font-bold mb-1">Gênero *</label>
                                <select
                                    value={form.gender}
                                    onChange={(e) => update('gender', e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                >
                                    <option value="">Selecione</option>
                                    <option value="macho">Macho</option>
                                    <option value="femea">Fêmea</option>
                                </select>
                                {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender}</p>}
                            </div>

                            <div>
                                <label className="block text-base font-bold mb-1">Cor *</label>
                                <input
                                    type="text"
                                    placeholder="Preto, caramelo..."
                                    value={form.color}
                                    onChange={(e) => update('color', e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.color && <p className="text-red-600 text-sm mt-1">{errors.color}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-base font-bold mb-1">Cidade do Dono *</label>
                            <select
                                value={form.city}
                                onChange={(e) => update('city', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Selecione a cidade</option>
                                <option value="Belém">Belém</option>
                                <option value="Santarém">Santarém</option>
                                <option value="Salvador">Salvador</option>
                            </select>
                            {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
                        </div>

                        <div>
                            <p className="block text-base font-bold mb-2">Seu animal de estimação é castrado ou esterilizado? *</p>
                            <div className="flex items-center gap-6">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="sterilized"
                                        value="yes"
                                        checked={form.sterilized === 'yes'}
                                        onChange={() => update('sterilized', 'yes')}
                                        className="mr-2"
                                    />
                                    Sim
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="sterilized"
                                        value="no"
                                        checked={form.sterilized === 'no'}
                                        onChange={() => update('sterilized', 'no')}
                                        className="mr-2"
                                    />
                                    Não
                                </label>
                            </div>
                            {errors.sterilized && <p className="text-red-600 text-sm mt-1">{errors.sterilized}</p>}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <div className="w-44">
                                <Button bgColor="#F57B42" textColor="#fff" type="submit">Continuar</Button>
                            </div>
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <h3 className="text-4xl font-extrabold mb-12 text-left">Imagens</h3>
                        <p className="text-sm text-gray-600">O formato da imagem deve (.jpg, .png, .jpeg).</p>
                        <p className="text-sm text-gray-600">As medidas da imagem devem ser quadradas, com dimensões de 600 x 600 pixels.</p>
                        <p className="text-sm text-gray-600">O tamanho máximo e mínimo da imagem é 1024 e 240KB.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {images.map((img, idx) => (
                                <label key={idx} className="flex items-center justify-center border-2 border-dashed rounded-md p-2 bg-gray-50 cursor-pointer overflow-hidden" style={{ minHeight: 296 }}>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg"
                                        className="hidden"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImageChange(idx, e.target.files ? e.target.files[0] : null)}
                                    />
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                        {img.preview ? (
                                            <img src={img.preview as string} alt={`preview-${idx}`} className="object-cover w-full h-full" />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                <Icon icon="ph:camera-light" width="48" height="48" />
                                                <span className="text-sm mt-2">Adicionar imagem</span>
                                            </div>
                                        )}

                                        {img.error && <p className="text-red-600 text-sm mt-2">{img.error}</p>}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                        <h3 className="text-4xl font-extrabold mb-12 text-left">História</h3>
                        <p className="text-sm text-gray-600">Compartilhe aqui qualquer coisa sobre seu animal de estimação. (O perfil do seu animal de estimação ficará visível ao público. Para sua segurança, não inclua dados pessoais ou informações de contato.) Inclua informações como:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            <li>Histórico do seu animal de estimação: há quanto tempo você o tem, de onde o adquiriu e por que precisa de um novo lar para ele.</li>
                            <li>Detalhes sobre com quem seu animal de estimação conviveu, por exemplo, crianças e outros animais de estimação.</li>
                            <li>Atividades favoritas do seu animal de estimação.</li>
                            <li>Uma descrição de sua personalidade, preferências e hábitos.</li>
                            <li>Qualquer coisa de que ele tenha medo, como fogos de artifício, pessoas uniformizadas, outros animais.</li>
                            <li>O tipo de comida que ele come, incluindo a marca e a quantidade.</li>
                            <li>Alergias, problemas de saúde e quaisquer medicamentos que seu animal de estimação tome.</li>
                            <li>Se você estiver listando um casal unido, certifique-se de incluir detalhes sobre ambos os animais.</li>
                        </ul>

                        <div>
                            <label className="block text-sm font-medium mb-2">Descrição</label>
                            <textarea
                                placeholder="Escreva aqui..."
                                value={form.story}
                                onChange={(e) => update('story', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                style={{ height: 212 }}
                            />
                        </div>
                    </div>
                )}

                {(step === 2 || step === 3) && (
                    <div className="w-full flex mt-6 justify-between">
                        <div className="w-44">
                            <Button onClick={() => setStep((s) => Math.max(1, s - 1))}>Voltar</Button>
                        </div>
                        <div className="w-44">
                            {step === 2 ? (
                                <Button bgColor="#F57B42" textColor="#fff" onClick={() => setStep(3)}>Continuar</Button>
                            ) : (
                                <Button bgColor="#F57B42" textColor="#fff" onClick={() => setStep(4)}>Enviar</Button>
                            )}
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Obrigado por enviar!</h3>
                        <p className="text-base font-bold text-black">Entraremos em contato assim que analisarmos o perfil do seu animal de estimação.</p>
                        <p className="text-base font-bold text-black">Queremos ter certeza de que lhe daremos a melhor chance de encontrar o lar certo para seu animal de estimação.</p>

                        <div className="mt-6 flex justify-center">
                            <div className="flex items-center justify-center">
                                <img src="/assets/images/cat-register.svg" alt="Obrigado" className="w-2xs h-2xs object-contain" />
                            </div>
                        </div>
                        <div className="w-full mt-6 flex justify-center items-center">
                            <div className="max-w-44">
                                <Button bgColor="#F57B42" textColor="#fff" onClick={() => navigate('/adoption')}>Ir para perfil</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
